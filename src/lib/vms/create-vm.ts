"use server"

/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import { DefaultAzureCredential } from "@azure/identity"
import { ComputeManagementClient } from "@azure/arm-compute"
import { ResourceManagementClient } from "@azure/arm-resources"
import { StorageManagementClient } from "@azure/arm-storage"
import {
  NetworkManagementClient,
  PublicIPAddress,
  Subnet,
} from "@azure/arm-network"
import * as util from "util"

let randomIds = {}
let subnetInfo = null
let publicIPInfo = null
let vmImageInfo = null
let nicInfo = null
let accountInfo = null
let vnetInfo = null
let result = null
let nicResult = null
let vmInfo = null

const location = "eastus"
const accType = "Standard_LRS"

const adminUsername = "notadmin"
const adminPassword = "Pa$$w0rd92"

const clientId = process.env.AZURE_CLIENT_ID
const domain = process.env.AZURE_TENANT_ID
const secret = process.env.AZURE_CLIENT_SECRET
const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID

if (!clientId || !domain || !secret || !subscriptionId) {
  console.log("Default credentials couldn't be found")
}

const credentials = new DefaultAzureCredential()

const resourceClient = new ResourceManagementClient(
  credentials,
  subscriptionId!
)
const computeClient = new ComputeManagementClient(credentials, subscriptionId!)
const storageClient = new StorageManagementClient(credentials, subscriptionId!)
const networkClient = new NetworkManagementClient(credentials, subscriptionId!)

export const launchCreateResources = async (osType: string) => {
  try {
    await createResources(osType)
  } catch (err) {
    console.log(err)
  }
}

const createResources = async (osType: string) => {
  try {
    const { publisher, offer, sku } = getOSImageInfo(osType)

    result = await createResourceGroup()
    accountInfo = await createStorageAccount()
    vnetInfo = await createVnet()
    subnetInfo = await getSubnetInfo()
    publicIPInfo = await createPublicIP()
    nicInfo = await createNIC(subnetInfo, publicIPInfo)
    vmImageInfo = await findVMImage(publisher, offer, sku)
    nicResult = await getNICInfo()
    vmInfo = await createVirtualMachine(
      nicInfo.id,
      vmImageInfo[0].name,
      publisher,
      offer,
      sku
    )

    return
  } catch (err) {
    console.log(err)
  }
}

const createResourceGroup = async () => {
  const groupParameters = {
    location: location,
    tags: { sampletag: "sampleValue" },
  }
  console.log("\n1.Creating resource group: " + resourceGroupName)

  return await resourceClient.resourceGroups.createOrUpdate(
    resourceGroupName,
    groupParameters
  )
}

const createStorageAccount = async () => {
  console.log("\n2.Creating storage account: " + storageAccountName)
  const createParameters = {
    location: location,
    sku: {
      name: accType,
    },
    kind: "Storage",
    tags: {
      tag1: "val1",
      tag2: "val2",
    },
  }

  return await storageClient.storageAccounts.beginCreateAndWait(
    resourceGroupName,
    storageAccountName,
    createParameters
  )
}

const createVnet = async () => {
  const vnetParameters = {
    location: location,
    addressSpace: {
      addressPrefixes: ["10.0.0.0/16"],
    },
    dhcpOptions: {
      dnsServers: ["10.1.1.1", "10.1.2.4"],
    },
    subnets: [{ name: subnetName, addressPrefix: "10.0.0.0/24" }],
  }
  console.log("\n3.Creating vnet: " + vnetName)

  return await networkClient.virtualNetworks.beginCreateOrUpdateAndWait(
    resourceGroupName,
    vnetName,
    vnetParameters
  )
}

const getSubnetInfo = async () => {
  console.log("\nGetting subnet info for: " + subnetName)

  return await networkClient.subnets.get(
    resourceGroupName,
    vnetName,
    subnetName
  )
}

const createPublicIP = async () => {
  const publicIPParameters = {
    location: location,
    publicIPAllocationMethod: "Dynamic",
    dnsSettings: {
      domainNameLabel: domainNameLabel,
    },
  }
  console.log("\n4.Creating public IP: " + publicIPName)

  return await networkClient.publicIPAddresses.beginCreateOrUpdateAndWait(
    resourceGroupName,
    publicIPName,
    publicIPParameters
  )
}

const createNIC = async (subnetInfo: Subnet, publicIPInfo: PublicIPAddress) => {
  const nicParameters = {
    location: location,
    ipConfigurations: [
      {
        name: ipConfigName,
        privateIPAllocationMethod: "Dynamic",
        subnet: subnetInfo,
        publicIPAddress: publicIPInfo,
      },
    ],
  }
  console.log("\n5.Creating Network Interface: " + networkInterfaceName)

  return await networkClient.networkInterfaces.beginCreateOrUpdateAndWait(
    resourceGroupName,
    networkInterfaceName,
    nicParameters
  )
}

const getOSImageInfo = (osType: string) => {
  let publisher, offer, sku

  if (osType === "Ubuntu") {
    publisher = "Canonical"
    offer = "UbuntuServer"
    sku = "14.04.3-LTS"
  } else if (osType === "Debian") {
    publisher = "debian"
    offer = "debian-10"
    sku = "10"
  } else if (osType === "Windows") {
    publisher = "MicrosoftWindowsServer"
    offer = "WindowsServer"
    sku = "2019-Datacenter"
  } else {
    throw new Error("Invalid OS type specified.")
  }

  return { publisher, offer, sku }
}

const findVMImage = async (publisher: string, offer: string, sku: string) => {
  console.log(
    util.format(
      "\nFinding a VM Image for location %s from " +
        "publisher %s with offer %s and sku %s",
      location,
      publisher,
      offer,
      sku
    )
  )

  return await computeClient.virtualMachineImages.list(
    location,
    publisher,
    offer,
    sku,
    { top: 1 }
  )
}

const getNICInfo = async () => {
  return await networkClient.networkInterfaces.get(
    resourceGroupName,
    networkInterfaceName
  )
}

const createVirtualMachine = async (
  nicId: string | undefined,
  vmImageVersionNumber: string,
  publisher: string,
  offer: string,
  sku: string
): Promise<void> => {
  const parameters = {
    location: location,
    osProfile: {
      computerName: vmName,
      adminUsername: adminUsername,
      adminPassword: adminPassword,
    },
    hardwareProfile: {
      vmSize: "Standard_B1ls",
    },
    storageProfile: {
      imageReference: {
        publisher: publisher,
        offer: offer,
        sku: sku,
        version: vmImageVersionNumber,
      },
      osDisk: {
        name: osDiskName,
        createOption: "fromImage",
        vhd: {
          uri:
            "https://" +
            storageAccountName +
            ".blob.core.windows.net/nodejscontainer/osnodejslinux.vhd",
        },
      },
    },
    networkProfile: {
      networkInterfaces: [
        {
          id: nicId,
          primary: true,
        },
      ],
    },
  }
  console.log("6.Creating Virtual Machine: " + vmName)
  console.log(
    " VM create parameters: " + util.inspect(parameters, { depth: null })
  )
  await computeClient.virtualMachines.beginCreateOrUpdateAndWait(
    resourceGroupName,
    vmName,
    parameters
  )
  console.log("Virtual Machine created.")
}

function _generateRandomId(prefix: string | number, existIds: {}) {
  var newNumber

  // eslint-disable-next-line no-constant-condition
  while (true) {
    newNumber = String(prefix) + Math.floor(Math.random() * 10000)

    if (!existIds || !(newNumber in existIds)) {
      break
    }
  }

  return newNumber
}

const resourceGroupName = _generateRandomId("diberry-testrg", randomIds)
const vmName = _generateRandomId("testvm", randomIds)
const storageAccountName = _generateRandomId("testac", randomIds)
const vnetName = _generateRandomId("testvnet", randomIds)
const subnetName = _generateRandomId("testsubnet", randomIds)
const publicIPName = _generateRandomId("testpip", randomIds)
const networkInterfaceName = _generateRandomId("testnic", randomIds)
const ipConfigName = _generateRandomId("testcrpip", randomIds)
const domainNameLabel = _generateRandomId("testdomainname", randomIds)
const osDiskName = _generateRandomId("testosdisk", randomIds)
