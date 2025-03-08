// This file is part of MinIO Console Server
// Copyright (c) 2022 MinIO, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import React, { Fragment, useState } from "react";
import get from "lodash/get";
import styled from "styled-components";
import {
  AddNewTagIcon,
  Button,
  DisabledIcon,
  EditTagIcon,
  InputBox,
  SectionTitle,
  Box,
  Grid,
  Tag,
  FormLayout, EditIcon,
} from "mds";
import { BucketObject } from "api/consoleApi";
import { api } from "api";
import { errorToHandler } from "api/errors";
import { useSelector } from "react-redux";
import ModalWrapper from "../../../../Common/ModalWrapper/ModalWrapper";
import { modalStyleUtils } from "../../../../Common/FormComponents/common/styleLibrary";
import { IAM_SCOPES } from "../../../../../../common/SecureComponent/permissions";
import { SecureComponent } from "../../../../../../common/SecureComponent";
import {
  selDistSet,
  setModalErrorSnackMessage,
} from "../../../../../../systemSlice";
import { useAppDispatch } from "../../../../../../store";

interface IRenameModalProps {
  modalOpen: boolean;
  bucketName: string;
  actualInfo: BucketObject;
  onCloseAndUpdate: (refresh: boolean) => void;
}
const RenameModal = ({
  modalOpen,
  onCloseAndUpdate,
  bucketName,
  actualInfo,
}: IRenameModalProps) => {
  const dispatch = useAppDispatch();
  const distributedSetup = useSelector(selDistSet);

  // calculate object name to display
  let objectNameArray: string[] = [];
  if (actualInfo && actualInfo.name) {
      objectNameArray = actualInfo.name.split("/");
  }
  const objectName =
    objectNameArray.length > 0
      ? objectNameArray[objectNameArray.length - 1]
      : actualInfo.name;

  // tail slash 제거
  const objectPath = actualInfo.name?.replace(objectName!!,"") || ""
  const [newName, setNewName] = useState<string>(objectName || "");
  const [isSending, setIsSending] = useState<boolean>(false);


  const allPathData = actualInfo.name?.split("/");
  const currentItem = allPathData?.pop() || "";

  const resetForm = () => {
    setNewName(objectName || "");
  };

  const renameProcess = () => {
    setIsSending(true);

    console.log(`objectPath   : ${objectPath}`)
    console.log(`objectNameArray   : ${objectNameArray}`)
    console.log(`objectName   : ${objectName}`)
    console.log(`source: ${bucketName}/${actualInfo.name}`)
    console.log(`target: ${bucketName}/${objectPath}${newName}`);

    api.buckets.objectsCopyObjectUpdate(
      bucketName,
      {
        source: objectName!,
        target_bucket: bucketName,
        target: `${objectPath}${newName}`,
      },
    ).then(() => {
      return api.buckets.deleteObject(
        bucketName,
        {
          prefix: objectName!,
        },
      )
    }).then(() => {
      onCloseAndUpdate(true);
      setIsSending(false);
    }).catch((err) => {
      dispatch(setModalErrorSnackMessage(errorToHandler(err.error)));
      setIsSending(false);
    });
  };

  const renameFor = (plural: boolean) => (
    <Box
      sx={{
        fontSize: 16,
        margin: "20px 0 30px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        width: "100%",
      }}
    >
      Rename for: <strong>{currentItem}</strong>
    </Box>
  );

  return (
    <Fragment>
      <ModalWrapper
        modalOpen={modalOpen}
        title="Rename Object"
        onClose={() => {
          onCloseAndUpdate(true);
        }}
        iconColor={"default"}
        titleIcon={<EditIcon />}
      >
        {
          <Box>
            <SecureComponent
              scopes={[
                IAM_SCOPES.S3_GET_OBJECT_TAGGING,
                IAM_SCOPES.S3_GET_ACTIONS,
              ]}
              resource={bucketName}
            >
              <Box
                sx={{
                  display: "flex",
                  flexFlow: "column",
                  width: "100%",
                }}
              >
                {renameFor(true)}
              </Box>
            </SecureComponent>
            <SecureComponent
              scopes={[
                IAM_SCOPES.S3_PUT_OBJECT_TAGGING,
                IAM_SCOPES.S3_PUT_ACTIONS,
              ]}
              resource={bucketName}
              errorProps={{ disabled: true, onClick: null }}
            >
              <Box>
                <FormLayout containerPadding={false} withBorders={false}>
                  <InputBox
                    value={newName}
                    label={"New name"}
                    id={"newName"}
                    name={"newName"}
                    placeholder={"Enter new name"}
                    onChange={(e) => {
                      setNewName(e.target.value);
                    }}
                  />
                  <Grid item xs={12} sx={modalStyleUtils.modalButtonBar}>
                    <Button
                      id={"clear"}
                      type="button"
                      variant="regular"
                      color="primary"
                      onClick={resetForm}
                      label={"Clear"}
                    />
                    <Button
                      type="submit"
                      variant="callAction"
                      disabled={
                          newName.trim() === "" ||
                          newName.trim() === objectName ||
                          isSending
                      }
                      onClick={renameProcess}
                      id="rename"
                      label={"Save"}
                    />
                  </Grid>
                </FormLayout>
              </Box>
            </SecureComponent>
          </Box>
        }
      </ModalWrapper>
    </Fragment>
  );
};

export default RenameModal;
