import { Layout, Menu } from "antd";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";

const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  SUPER_ADMIN: "superAdmin",
  FACULTY: "faculty",
  STUDENT: "student",
};

const Sidebar = () => {
  const user = useAppSelector(selectCurrentUser);

  let sidebarItems;

  switch (user?.role) {
    case userRole.SUPER_ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.SUPER_ADMIN);

      break;
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);

      break;
    case userRole.FACULTY:
      sidebarItems = sidebarItemsGenerator(facultyPaths, userRole.FACULTY);

      break;
    case userRole.STUDENT:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.STUDENT);

      break;
    default:
      break;
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      width={280}
      style={{ height: "100vh", position: "sticky", left: 0, top: 0 }}
    >
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>UMS</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
