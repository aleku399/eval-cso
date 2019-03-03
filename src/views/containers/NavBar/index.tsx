import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { AppState } from "../../../redux";
import { changeQualityView, ChangeQualityView } from "../../../redux/actions";
import NavMenu, {
  horizontal,
  SetActiveMenuItem
} from "../../components/NavMenu";

const items = [
  { name: "Enter Quality Score", id: "enter-score" },
  { name: "Data", id: "data-view" },
  { name: "Summary", id: "summary" }
];

interface Props {
  setActiveMenuItem: SetActiveMenuItem;
  activeItem: string;
}

function SideBarMenu(props: Props) {
  return (
    <div>
      <NavMenu {...props} items={items} alignment={horizontal} />
    </div>
  );
}

const mapStateToProps = ({ qualityView }: AppState) => ({
  activeItem: qualityView
});

const mapDispatchToProps = (dispatch: Dispatch<ChangeQualityView>) => ({
  setActiveMenuItem: bindActionCreators(changeQualityView, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBarMenu);
