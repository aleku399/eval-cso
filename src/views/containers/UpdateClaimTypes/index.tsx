import React from "react";
import { connect } from "react-redux";
import { claimTypesApi } from "../../../lib/apiEndpoints";
import { authAxios } from "../../../lib/axios";
import { throwLoginError } from "../../../lib/errors";
import { useAxiosGet } from "../../../lib/useAxios";
import { AppState } from "../../../redux/reducers";
import UpdateClaimTypes, {
  ClaimType,
  SubmitCreateClaimTypes
} from "../../components/UpdateClaimTypes";

interface Props {
  jwt: string;
}

const createClaimTypes = (
  jwt: string
): SubmitCreateClaimTypes => async payload => {
  return authAxios(jwt).post(claimTypesApi, payload);
};

const mapStateToProps = ({ login: { jwt } }: AppState): Props => ({
  jwt
});

function UpdateClaimTypesContainer({ jwt }: Props) {
  if (!jwt) {
    throwLoginError();
  }

  const { data, loading, error } = useAxiosGet<ClaimType[]>(jwt)(claimTypesApi);
  return (
    <UpdateClaimTypes
      claimTypes={data || []}
      error={error}
      loading={loading}
      onSubmit={createClaimTypes(jwt)}
    />
  );
}

export default connect<Props>(mapStateToProps)(UpdateClaimTypesContainer);
