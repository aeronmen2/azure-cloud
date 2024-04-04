import DebianLogo from "@/public/debianlogo.png"
import VirtualMachine from "../virtual-machines"

const Debian = () => {
  return <VirtualMachine name="Debian" logo={DebianLogo} machine="debian" />
}

export default Debian
