import { MainNav } from "./nav";

const Login = () => {
  return (
    <div>
      <MainNav />
      <form action="post">
        <label htmlFor="username">Username: </label>
        <br />
        <input type="text" name="username" />
        <br />
        <label htmlFor="password">Password: </label>
        <br />
        <input type="text" name="password" />
        <br />
        <input type="submit" value="Register!" />
        <br />
      </form>
    </div>
  );
};

export { Login };
