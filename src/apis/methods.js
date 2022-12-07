import Myaxios from "./static/MyAxios";

const LoginAction = (user) => {
  console.log(user);
  // return Myaxios.post("/auth/signin", user)
  return Myaxios({
    method: "POST",
    url: "/auth/signin",
    data: user
  })
    .then((res) => {
      const data = res.data;
      window.localStorage.setItem("token", data.token);
      return { status: res.status, data: res.data };
    })
    .catch((err) => {
      // console.log(err);
      return {
        status: err.response.status,
        data: err.response.data,
        message: err.message
      };
    });
};

const GetCaptcha = (email) => {
  const res = Myaxios({
    method: "get",
    url: "auth/captcha",
    params: email
  })
    .then((res) => {
      return { status: res.status, data: res.data };
    })
    .catch((err) => {
      return err.response;
    });
  // console.log(res);
  return res;
};

const GetProductList = ({ id, page, size }) => {
  // console.log(id, page, size);
  return Myaxios({
    url: "product",
    params: { organizationId: id, page: page, size: size },
    method: "GET"
  })
    .then((res) => ({ status: res.status, data: res.data }))
    .catch((err) => ({
      status: err.response.status,
      data: err.response.data.data,
      message: err.response?.statusText
    }));
};

const GetOrganizationList = (rule) => {
  // const { page, size } = rule;
  // (page = page ?? 2), (size = size ?? 10);
  return Myaxios({
    params: rule,
    method: "GET",
    url: "organization"
  })
    .then((res) => ({ status: res.status, data: res.data }))
    .catch((err) => {
      // console.log("err:", err);
      return {
        status: err.response.status,
        data: err.response.data.data,
        message: err.response?.statusText
      };
    });
};

const GetOrganization = (id) => {
  return Myaxios({
    method: "GET",
    url: "organization/" + id
  })
    .then((res) => ({ status: res.status, data: res.data }))
    .catch((err) => {
      // console.log("err:", err);
      return {
        status: err.response.status,
        data: err.response.data.data,
        message: err.response?.statusText
      };
    });
};

const GetUser = () => {
  return Myaxios({
    method: "GET",
    url: "auth/me"
  })
    .then((res) => ({ status: res.status, data: res.data }))
    .catch((err) => {
      console.log("err:", err);
      return {
        status: err.response.status,
        data: err.response.data.data,
        message: err.response?.statusText
      };
    });
};
const CheckStatus = async () => {
  if (!window.localStorage.getItem("token")) return false;
  else {
    const data = await GetUser();
    // await console.log(data);
    if (data.status === 200) return true;
    else return false;
  }
};

const GetProduct = (id) => {
  return Myaxios({
    method: "GET",
    url: "product/" + id
  })
    .then((res) => ({ status: res.status, data: res.data }))
    .catch((err) => {
      return {
        status: err.response.status,
        data: err.response.data.data,
        message: err.response?.statusText
      };
    });
};

const GetDeviceList = ({ id, page, size }) => {
  // console.log(id, page, size);
  return Myaxios({
    url: "product/" + id + "/device",
    params: { page: page, size: size },
    method: "GET"
  })
    .then((res) => ({ status: res.status, data: res.data }))
    .catch((err) => ({
      status: err.response.status,
      data: err.response.data.data,
      message: err.response?.statusText
    }));
};

const GetDevice = ({ proid, devid }) => {
  // console.log(proid, devid);
  return Myaxios({
    url: "product/" + proid + "/device/" + devid,
    method: "GET"
  })
    .then((res) => ({ status: res.status, data: res.data }))
    .catch((err) => ({
      status: err.response.status,
      data: err.response.data.data,
      message: err.response?.statusText
    }));
};

const PostCoordinate = ({ start, end, tags, queries, proid }) => {
  return Myaxios({
    url: "product/" + proid + "/query",
    method: "POST",
    data: {
      start,
      end,
      tags,
      queries
    }
  })
    .then((res) => ({ status: res.status, data: res.data }))
    .catch((err) => ({
      status: err.response.status,
      data: err.response.data.data,
      message: err.response?.statusText
    }));
};

const GetIncident = ({ id, page, size }) => {
  return Myaxios({
    url: "incident",
    params: { page, size, productId: id },
    method: "GET"
  })
    .then((res) => ({ status: res.status, data: res.data }))
    .catch((err) => ({
      status: err.response.status,
      data: err.response.data.data,
      message: err.response?.statusText
    }));
};

export {
  LoginAction,
  GetCaptcha,
  GetProductList,
  GetOrganizationList,
  CheckStatus,
  GetUser,
  GetOrganization,
  GetProduct,
  GetDevice,
  GetDeviceList,
  PostCoordinate,
  GetIncident
};
