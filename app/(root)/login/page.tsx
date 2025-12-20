import { UserLogin } from "@/Components/Authentication";

const LoginRoute = () => {
  return (
    <div className="h-screen w-screen bg-neutral-900 flex items-center justify-center">
      <UserLogin />
    </div>
  );
};

export default LoginRoute;
