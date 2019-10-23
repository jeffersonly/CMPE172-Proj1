/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    username
    avatar {
      bucket
      region
      key
    }
  }
}
`;
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    username
    avatar {
      bucket
      region
      key
    }
  }
}
`;
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    id
    username
    avatar {
      bucket
      region
      key
    }
  }
}
`;
export const createItem = `mutation CreateItem($input: CreateItemInput!) {
  createItem(input: $input) {
    id
    name
    price
    description
    filename
    key
    avatar {
      bucket
      region
      key
    }
    userID
  }
}
`;
export const updateItem = `mutation UpdateItem($input: UpdateItemInput!) {
  updateItem(input: $input) {
    id
    name
    price
    description
    filename
    key
    avatar {
      bucket
      region
      key
    }
    userID
  }
}
`;
export const deleteItem = `mutation DeleteItem($input: DeleteItemInput!) {
  deleteItem(input: $input) {
    id
    name
    price
    description
    filename
    key
    avatar {
      bucket
      region
      key
    }
    userID
  }
}
`;
