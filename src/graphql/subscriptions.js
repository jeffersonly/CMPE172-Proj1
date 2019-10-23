/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
export const onCreateItem = `subscription OnCreateItem {
  onCreateItem {
    id
    name
    description
    filename
    key
    avatar {
      bucket
      region
      key
    }
    userID
    dateUploaded
    dateEdited
    fileSize
  }
}
`;
export const onUpdateItem = `subscription OnUpdateItem {
  onUpdateItem {
    id
    name
    description
    filename
    key
    avatar {
      bucket
      region
      key
    }
    userID
    dateUploaded
    dateEdited
    fileSize
  }
}
`;
export const onDeleteItem = `subscription OnDeleteItem {
  onDeleteItem {
    id
    name
    description
    filename
    key
    avatar {
      bucket
      region
      key
    }
    userID
    dateUploaded
    dateEdited
    fileSize
  }
}
`;
