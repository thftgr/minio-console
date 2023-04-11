// Code generated by go-swagger; DO NOT EDIT.

// This file is part of MinIO Console Server
// Copyright (c) 2023 MinIO, Inc.
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
//

package models

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"context"
	"strconv"

	"github.com/go-openapi/errors"
	"github.com/go-openapi/strfmt"
	"github.com/go-openapi/swag"
)

// BucketVersioningResponse bucket versioning response
//
// swagger:model bucketVersioningResponse
type BucketVersioningResponse struct {

	// m f a delete
	MFADelete string `json:"MFADelete,omitempty"`

	// exclude folders
	ExcludeFolders bool `json:"excludeFolders,omitempty"`

	// excluded prefixes
	ExcludedPrefixes []*BucketVersioningResponseExcludedPrefixesItems0 `json:"excludedPrefixes"`

	// status
	Status string `json:"status,omitempty"`
}

// Validate validates this bucket versioning response
func (m *BucketVersioningResponse) Validate(formats strfmt.Registry) error {
	var res []error

	if err := m.validateExcludedPrefixes(formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *BucketVersioningResponse) validateExcludedPrefixes(formats strfmt.Registry) error {
	if swag.IsZero(m.ExcludedPrefixes) { // not required
		return nil
	}

	for i := 0; i < len(m.ExcludedPrefixes); i++ {
		if swag.IsZero(m.ExcludedPrefixes[i]) { // not required
			continue
		}

		if m.ExcludedPrefixes[i] != nil {
			if err := m.ExcludedPrefixes[i].Validate(formats); err != nil {
				if ve, ok := err.(*errors.Validation); ok {
					return ve.ValidateName("excludedPrefixes" + "." + strconv.Itoa(i))
				} else if ce, ok := err.(*errors.CompositeError); ok {
					return ce.ValidateName("excludedPrefixes" + "." + strconv.Itoa(i))
				}
				return err
			}
		}

	}

	return nil
}

// ContextValidate validate this bucket versioning response based on the context it is used
func (m *BucketVersioningResponse) ContextValidate(ctx context.Context, formats strfmt.Registry) error {
	var res []error

	if err := m.contextValidateExcludedPrefixes(ctx, formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *BucketVersioningResponse) contextValidateExcludedPrefixes(ctx context.Context, formats strfmt.Registry) error {

	for i := 0; i < len(m.ExcludedPrefixes); i++ {

		if m.ExcludedPrefixes[i] != nil {
			if err := m.ExcludedPrefixes[i].ContextValidate(ctx, formats); err != nil {
				if ve, ok := err.(*errors.Validation); ok {
					return ve.ValidateName("excludedPrefixes" + "." + strconv.Itoa(i))
				} else if ce, ok := err.(*errors.CompositeError); ok {
					return ce.ValidateName("excludedPrefixes" + "." + strconv.Itoa(i))
				}
				return err
			}
		}

	}

	return nil
}

// MarshalBinary interface implementation
func (m *BucketVersioningResponse) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *BucketVersioningResponse) UnmarshalBinary(b []byte) error {
	var res BucketVersioningResponse
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}

// BucketVersioningResponseExcludedPrefixesItems0 bucket versioning response excluded prefixes items0
//
// swagger:model BucketVersioningResponseExcludedPrefixesItems0
type BucketVersioningResponseExcludedPrefixesItems0 struct {

	// prefix
	Prefix string `json:"prefix,omitempty"`
}

// Validate validates this bucket versioning response excluded prefixes items0
func (m *BucketVersioningResponseExcludedPrefixesItems0) Validate(formats strfmt.Registry) error {
	return nil
}

// ContextValidate validates this bucket versioning response excluded prefixes items0 based on context it is used
func (m *BucketVersioningResponseExcludedPrefixesItems0) ContextValidate(ctx context.Context, formats strfmt.Registry) error {
	return nil
}

// MarshalBinary interface implementation
func (m *BucketVersioningResponseExcludedPrefixesItems0) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *BucketVersioningResponseExcludedPrefixesItems0) UnmarshalBinary(b []byte) error {
	var res BucketVersioningResponseExcludedPrefixesItems0
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}
