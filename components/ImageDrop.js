import React, { useState } from "react";
import { DropZone, Thumbnail, Spinner } from "@shopify/polaris";
import { gql } from 'apollo-boost';
import { useMutation } from "react-apollo";

const STAGED_UPLOADS_CREATE = gql`
  mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
    stagedUploadsCreate(input: $input) {
      stagedTargets {
        resourceUrl
        url
        parameters {
          name
          value
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const COLLECTION_UPDATE = gql`
  mutation collectionUpdate($input: CollectionInput!) {
    collectionUpdate(input: $input) {
      collection {
        id
        image {
          originalSrc
        }
      }
      job {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`

function ImageDrop(props) {
  const [loading, setLoading] = useState(false);
  const [collectionUpdate] = useMutation(COLLECTION_UPDATE);
  const [stagedUploadsCreate] = useMutation(STAGED_UPLOADS_CREATE);

  const handleDropZoneDrop = async ([file]) => {
    setLoading(true)
  }

  return (
    <DropZone onDrop={handleDropZoneDrop} allowMultiple={false}>
      { loading ? <Spinner size="large" /> : <Thumbnail source={props.collectionImage} /> }
    </DropZone>
  );
}

export default ImageDrop;
