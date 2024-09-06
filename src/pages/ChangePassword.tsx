import { Button, Row } from "antd";
import UMForm from "../components/form/UMForm";
import UMInput from "../components/form/UMInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useChangePasswordMutation } from "../redux/features/admin/userManagement.api";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await changePassword(data);

    if (res?.data?.success) {
      dispatch(logout());
      navigate("/login");
      toast.success(res?.data?.data?.message);
    }
  };
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <UMForm onSubmit={onSubmit}>
        <UMInput
          type="password"
          name="oldPassword"
          placeholder="Old Password"
          label="Old Password: "
        />

        <UMInput
          type="password"
          name="newPassword"
          placeholder="New Password"
          label="New Password: "
        />

        <Button htmlType="submit">Change Password</Button>
      </UMForm>
    </Row>
  );
};

export default ChangePassword;
