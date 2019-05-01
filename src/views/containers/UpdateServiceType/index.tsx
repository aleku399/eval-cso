import { groupBy } from "lodash";
import React from "react";
import { connect } from "react-redux";
import { evaluationServiceApi } from "../../../lib/apiEndpoints";
import { authAxios } from "../../../lib/axios";
import { throwLoginError } from "../../../lib/errors";
import { useAxiosGet } from "../../../lib/useAxios";
import { AppState } from "../../../redux/reducers";
import { ParamCategoryName } from "../../components/EvaluationForm";
import UpdateServiceType, {
  categories,
  ParameterCategory,
  ParameterRes,
  SubmitCreateParameters
} from "../../components/UpdateServiceType";

interface Props {
  jwt: string;
  service: string;
}

const createParameters = (
  jwt: string
): SubmitCreateParameters => async payload => {
  return authAxios(jwt).post(evaluationServiceApi, payload);
};

const mapStateToProps = ({
  service: { active },
  login: { jwt }
}: AppState): Props => ({
  service: active,
  jwt
});

export function toParameterCategories(
  data?: ParameterRes[]
): ParameterCategory[] {
  if (!data) {
    return Object.keys(categories).map(categoryName => {
      return {
        value: categoryName as ParamCategoryName,
        name: categories[categoryName],
        parameters: []
      };
    });
  }

  const categoryGroups = groupBy<ParameterRes>(data, obj => obj.category);

  return Object.keys(categoryGroups).map(key => {
    const group: ParameterRes[] = categoryGroups[key];
    return {
      value: key as ParamCategoryName,
      name: categories[key],
      parameters: group
    };
  });
}

function UpdateServiceContainer({ jwt, service }: Props) {
  if (!jwt) {
    throwLoginError();
  }

  const { data, loading, error } = useAxiosGet<ParameterRes[]>(jwt)(
    `${evaluationServiceApi}/test`
  );

  return (
    <UpdateServiceType
      serviceType={service}
      parameterCategories={toParameterCategories(data)}
      error={error}
      loading={loading}
      onSubmit={createParameters(jwt)}
    />
  );
}

export default connect<Props>(mapStateToProps)(UpdateServiceContainer);
