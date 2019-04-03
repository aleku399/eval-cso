import { Action } from "redux";

export type QualityView = "data-view" | "summary-view" | "report-view";

export const CHANGE_QUALITY = "CHANGE_QUALITY";
export const CHANGE_QUALITY_VIEW = "CHANGE_QUALITY_VIEW";
export const LOADING_STATUS = "LOADING_STATUS";

export type ChangeQuality = Action & {
  quality: string;
};

export type ChangeQualityView = Action & {
  qualityView: string;
};

export type ChangeLoadingStatus = Action & {
  loading: boolean;
};

export type ChangeQualityFn = (quality: string) => ChangeQuality;

export const changeQuality: ChangeQualityFn = quality => ({
  type: CHANGE_QUALITY,
  quality
});

export type ChangeQualityViewFn = (
  qualityView: QualityView
) => ChangeQualityView;

export const changeQualityView: ChangeQualityViewFn = qualityView => ({
  type: CHANGE_QUALITY_VIEW,
  qualityView
});

export type ChangeLoadingStatusFn = (loading: boolean) => ChangeLoadingStatus;

export const changeLoadingStatus: ChangeLoadingStatusFn = loading => ({
  type: LOADING_STATUS,
  loading
});
