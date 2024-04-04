import { lusitana } from "@/ui/fonts"

const NoAccess = () => {
  return (
    <div className={`${lusitana.className} text-3xl m-4`}>
      <span role="img" aria-label="Restricted Access">
        ⛔️
      </span>{" "}
      No Access
      <p>
        Sorry, you don't have enough credits, you cannot access any Virtual
        Machines.
      </p>
    </div>
  )
}

export default NoAccess
