// This file is part of MinIO Console Server
// Copyright (c) 2020 MinIO, Inc.
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
import React from "react";
import { Grid, InputLabel, TextField, Tooltip } from "@material-ui/core";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import { fieldBasic, tooltipHelper } from "../common/styleLibrary";
import HelpIcon from "@material-ui/icons/Help";

interface CommentBoxProps {
  label: string;
  classes: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | boolean;
  id: string;
  name: string;
  disabled?: boolean;
  tooltip?: string;
  index?: number;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

const styles = (theme: Theme) =>
  createStyles({
    ...fieldBasic,
    ...tooltipHelper,
    inputLabel: {
      ...fieldBasic.inputLabel,
      marginBottom: 16,
      fontSize: 14,
    },
    textBoxContainer: {
      flexGrow: 1,
      position: "relative",
    },
    errorState: {
      color: "#b53b4b",
      fontSize: 14,
      position: "absolute",
      top: 7,
      right: 7,
    },
    cssOutlinedInput: {
      borderColor: "#9C9C9C",
      padding: 16,
    },
    rootContainer: {
      "& .MuiOutlinedInput-inputMultiline": {
        ...fieldBasic.inputLabel,
        fontSize: 13,
        minHeight: 150,
      },
    },
  });

const CommentBoxWrapper = ({
  label,
  onChange,
  value,
  id,
  name,
  disabled = false,
  tooltip = "",
  index = 0,
  error = "",
  required = false,
  placeholder = "",
  classes,
}: CommentBoxProps) => {
  let inputProps: any = { "data-index": index };

  return (
    <React.Fragment>
      <Grid
        item
        xs={12}
        className={`${classes.fieldContainer} ${
          error !== "" ? classes.errorInField : ""
        }`}
      >
        {label !== "" && (
          <InputLabel htmlFor={id} className={classes.inputLabel}>
            <span>
              {label}
              {required ? "*" : ""}
            </span>
            {tooltip !== "" && (
              <div className={classes.tooltipContainer}>
                <Tooltip title={tooltip} placement="top-start">
                  <HelpIcon className={classes.tooltip} />
                </Tooltip>
              </div>
            )}
          </InputLabel>
        )}

        <div className={classes.textBoxContainer}>
          <TextField
            id={id}
            name={name}
            fullWidth
            value={value}
            disabled={disabled}
            onChange={onChange}
            multiline
            inputProps={inputProps}
            error={error !== ""}
            helperText={error}
            placeholder={placeholder}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: {
                notchedOutline: classes.cssOutlinedInput,
                root: classes.rootContainer,
              },
            }}
            variant="outlined"
          />
        </div>
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(styles)(CommentBoxWrapper);
