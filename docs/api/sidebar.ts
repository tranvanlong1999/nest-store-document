import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/nest-store-api",
    },
    {
      type: "category",
      label: "Authentication",
      link: {
        type: "doc",
        id: "api/authentication",
      },
      items: [
        {
          type: "doc",
          id: "api/login-user",
          label: "User login",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/register-user",
          label: "Register new user",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Products",
      link: {
        type: "doc",
        id: "api/products",
      },
      items: [
        {
          type: "doc",
          id: "api/list-products",
          label: "List all products",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/create-product",
          label: "Create product",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/get-product",
          label: "Get product by ID",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Users",
      link: {
        type: "doc",
        id: "api/users",
      },
      items: [
        {
          type: "doc",
          id: "api/list-users",
          label: "List users",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/create-user",
          label: "Create user",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/get-user",
          label: "Get user by ID",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
