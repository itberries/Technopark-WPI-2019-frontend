import * as types from '../constants/actionTypes';
import backendAPIService from '../services/backend';
import * as Utils from '../utils/utils';

export function fetchSections() {
  return async (dispatch, getState) => {
    try {
      const sectionsArray = await backendAPIService.getSections();
      const [sectionsById, rootSectionId] = Utils.makeMapFromArray(sectionsArray);
      Utils.goThroughTheList(sectionsById, rootSectionId, (section) => {
        const [subsectionsById, rootSubsectionId] = Utils.makeMapFromArray(section.subsections);
        section.subsectionsById = subsectionsById;
        delete section.subsections;
        section.rootSubsectionId = rootSubsectionId;
      });
      dispatch({
        type: types.LEARNINGMAP_SECTIONS_FETCHED,
        sectionsById,
        rootSectionId,
      });
    } catch (error) {
      console.error(error);
    }
  };
}
