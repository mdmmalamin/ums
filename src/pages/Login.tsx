import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import UMForm from "../components/form/UMForm";
import UMInput from "../components/form/UMInput";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading("Logging...");

    try {
      const userInfo = {
        id: data.id,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();

      const user = verifyToken(res.data.accessToken) as TUser;

      dispatch(setUser({ user: user, token: res.data.accessToken }));

      toast.success("Logged In", { id: toastId, duration: 2000 });

      if (user.role === "superAdmin") {
        return navigate(`/admin/dashboard`);
      }

      res?.data?.needsPasswordChange
        ? navigate(`/change-password`)
        : navigate(`/${user?.role}/dashboard`);
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  const defaultValues = {
    admin: {
      id: "0001",
      password: "admin12345",
    },
    faculty: {},
    student: {
      id: "2026010001",
      password: "12342345",
    },
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <UMForm onSubmit={onSubmit} defaultValues={defaultValues.student}>
        <UMInput type="text" name="id" placeholder="ID" label="ID: " />

        <UMInput
          type="text"
          name="password"
          placeholder="Password"
          label="Password: "
        />

        <Button htmlType="submit">Login</Button>
      </UMForm>
    </Row>
  );
};

export default Login;
