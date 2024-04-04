import FullAccess from "./access/full-access"
import NoAccess from "./access/no-access"
import PartialAccess from "./access/partial-access"

interface VirtualMachineAccessProps {
  role: string
}

const VmsAccess = ({ role }: VirtualMachineAccessProps) =>
  role === "full-access" ? (
    <FullAccess />
  ) : role === "partial-access" ? (
    <PartialAccess />
  ) : (
    <NoAccess />
  )

export default VmsAccess
