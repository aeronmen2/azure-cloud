import SideNav from "@/ui/dashboard/sidenav"

const Dashboard = () => {
  return (
    <div className="h-screen">
      <div>
        {userRole === "partial-access" ? (
          <div>
            <p>Nav Item 1</p>
          </div>
        ) : userRole === "full-access" ? (
          <div>
            <p>Nav Item 1</p>
            <p>Nav Item 2</p>
            <p>Nav Item 3</p>
          </div>
        ) : null}
      </div>
      <div>
        <SideNav />
      </div>
    </div>
  )
}

export default Dashboard
