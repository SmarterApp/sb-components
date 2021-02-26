import {
  SearchAPIParamsModel,
  SearchFilterStringTypes,
  SearchFilterModelTypes,
  FilterType,
  GradeLevels,
  GradeLevel,
  TargetModel,
  ItemSearch,
  ItemCardModel
} from "@src/index";
import {
  genericSearchStringTypes,
  resultFilterOptionModel,
  resultFilterOptionModelSelected,
  resultFilterGradeModel,
  resultFilterGradeModelSelectedSingle,
  resultFilterGradeModelSelectedMultiple,
  searchOptionFilterTarget,
  resultSearchOptionFilterTarget,
  resultSearchOptionFilterTargetSelectedSingle,
  resultSearchOptionFilterTargetSelectedMultiple,
  mockSeachAPI,
  resultFilterOptionModelClaim,
  resultFilterOptionModelIT,
  resultFilterOptionModelSubject,
  gradeSearchStringTypes,
  resultFilterOptionModelGrade,
  targetSearchStringTypes,
  resultFilterOptionModeltarget,
  resultFilterOptionModelTechType,
  techtypeSearchStringTypes,
  claimsMocks
} from "@mocks/ItemSearch/mocks";
import { itemCardList } from "@mocks/index";

describe("ItemSearch.filterItemCards", () => {
  it("filters with empty filter", () => {
    const params: SearchAPIParamsModel = {};
    const result = ItemSearch.filterItemCards(itemCardList, params, []);
    expect(result).toHaveLength(0);
  });

  it("filters with only either Grade or with Subject filter", () => {
    const params_grade: SearchAPIParamsModel = {
      gradeLevels: GradeLevels.Elementary
    };
    const params_subject: SearchAPIParamsModel = {
      subjects: ["ELA"]
    };
    const result_filtererd_by_grade = ItemSearch.filterItemCards(
      itemCardList,
      params_grade,
      []
    );
    const result_filtererd_by_subject = ItemSearch.filterItemCards(
      itemCardList,
      params_subject,
      []
    );
    expect(result_filtererd_by_grade).toHaveLength(0);
    expect(result_filtererd_by_subject).toHaveLength(0);
  });

  it("filters with Grade & Subject filter", () => {
    const params: SearchAPIParamsModel = {
      gradeLevels: GradeLevels.Elementary,
      subjects: ["ELA"]
    };
    const result = ItemSearch.filterItemCards(itemCardList, params, []);
    expect(result).toHaveLength(2);
  });

  it("works without cards", () => {
    const params: SearchAPIParamsModel = {
      gradeLevels: GradeLevels.Middle,
      subjects: ["ELA"],
      claims: ["ELA4"]
    };
    const result = ItemSearch.filterItemCards([], params, []);
    expect(result).toHaveLength(0);
  });

  it("filters based on grade, subject, claim, target and Standard", () => {
    const params: SearchAPIParamsModel = {
      gradeLevels: GradeLevels.Grade4,
      subjects: ["ELA"],
      claims: ["ELA4"],
      targets: ["D"],
      coreStandards: ["4.E.4a"]
    };
    const result = ItemSearch.filterItemCards(itemCardList, params, []);
    const expectedCards = itemCardList.filter(
      c =>
        GradeLevel.gradeLevelContains(GradeLevels.Grade4, c.grade) &&
        c.subjectCode === "ELA" &&
        c.claimCode === "ELA4" &&
        c.targetId === "D" &&
        c.commonCoreStandardId === "4.E.4a"
    );

    expect(result).toHaveLength(1);
    expect(result).toContain(expectedCards[0]);
  });

  it("filters based on grade, subject and performance", () => {
    const params: SearchAPIParamsModel = {
      gradeLevels: GradeLevels.Grade6,
      subjects: ["MATH"],
      claims: ["MATH4"],
      targets: ["C"],
      coreStandards: ["6.M.2b"],
      performanceOnly: true
    };
    const result = ItemSearch.filterItemCards(itemCardList, params, []);
    const expectedCards = itemCardList.filter(
      c =>
        GradeLevel.gradeLevelContains(GradeLevels.Grade6, c.grade) &&
        c.subjectCode === "MATH" &&
        c.claimCode === "MATH4" &&
        c.targetId === "C" &&
        c.commonCoreStandardId === "6.M.2b" &&
        c.isPerformanceItem === true
    );

    expect(result).toHaveLength(expectedCards.length);
    expectedCards.forEach(card => expect(result).toContain(card));
  });
});

describe("ItemSearch.searchOptionFilterString", () => {
  it("empty options", () => {
    const optionParam: SearchFilterStringTypes[] = [];
    const filterParam = FilterType.Subject;

    const result = ItemSearch.searchOptionFilterString(
      optionParam,
      filterParam
    );
    expect(result).toEqual([]);
  });

  it("filled options length", () => {
    const optionParam = genericSearchStringTypes;
    const filterParam = FilterType.Subject;

    const result = ItemSearch.searchOptionFilterString(
      optionParam,
      filterParam
    );
    expect(result.length).toEqual(3);
  });

  it("filled options", () => {
    const optionParam = genericSearchStringTypes;
    const filterParam = FilterType.Subject;

    const result = ItemSearch.searchOptionFilterString(
      optionParam,
      filterParam
    );
    expect(result).toEqual(resultFilterOptionModel);
  });

  it("selected options", () => {
    const optionParam = genericSearchStringTypes;
    const filterParam = FilterType.Subject;
    const selectedCodesParam = ["t1", "t3"];

    const result = ItemSearch.searchOptionFilterString(
      optionParam,
      filterParam,
      selectedCodesParam
    );
    expect(result).toEqual(resultFilterOptionModelSelected);
  });
});

describe("ItemSearch.searchOptionToFilterGrade", () => {
  it("empty options", () => {
    const optionParam: GradeLevels[] = [];
    const filterParam = FilterType.Grade;

    const result = ItemSearch.searchOptionToFilterGrade(
      optionParam,
      filterParam
    );
    expect(result).toEqual([]);
  });

  it("filled options", () => {
    const optionParam: GradeLevels[] = [GradeLevels.Grade3, GradeLevels.Grade4];
    const filterParam = FilterType.Grade;

    const result = ItemSearch.searchOptionToFilterGrade(
      optionParam,
      filterParam
    );
    expect(result).toEqual(resultFilterGradeModel);
  });

  it("filled options Selected single", () => {
    const optionParam: GradeLevels[] = [GradeLevels.Grade3, GradeLevels.Grade4];
    const filterParam = FilterType.Grade;
    const selectedCodeParam = GradeLevels.Grade3;

    const result = ItemSearch.searchOptionToFilterGrade(
      optionParam,
      filterParam,
      selectedCodeParam
    );
    expect(result).toEqual(resultFilterGradeModelSelectedSingle);
  });

  it("filled options Selected multiple", () => {
    const optionParam: GradeLevels[] = [GradeLevels.Grade3, GradeLevels.Grade4];
    const filterParam = FilterType.Grade;
    // tslint:disable-next-line:no-bitwise
    const selectedCodeParam = GradeLevels.Grade3 | GradeLevels.Grade4;

    const result = ItemSearch.searchOptionToFilterGrade(
      optionParam,
      filterParam,
      selectedCodeParam
    );
    expect(result).toEqual(resultFilterGradeModelSelectedMultiple);
  });
});

describe("ItemSearch.searchOptionToFilterTarget", () => {
  it("empty options", () => {
    const optionParam: TargetModel[] = [];
    const filterParam = FilterType.Target;

    const result = ItemSearch.searchOptionToFilterTarget(
      optionParam,
      filterParam
    );
    expect(result).toEqual([]);
  });

  it("filled options", () => {
    const optionParam = searchOptionFilterTarget;
    const filterParam = FilterType.Target;

    const result = ItemSearch.searchOptionToFilterTarget(
      optionParam,
      filterParam
    );
    expect(result).toEqual(resultSearchOptionFilterTarget);
  });

  it("selected options single", () => {
    const optionParam = searchOptionFilterTarget;
    const filterParam = FilterType.Target;
    const selectedCodeParam = ["A"];

    const result = ItemSearch.searchOptionToFilterTarget(
      optionParam,
      filterParam,
      selectedCodeParam
    );
    expect(result).toEqual(resultSearchOptionFilterTargetSelectedSingle);
  });

  it("selected options multiple", () => {
    const optionParam = searchOptionFilterTarget;
    const filterParam = FilterType.Target;
    const selectedCodeParam = ["A", "C"];

    const result = ItemSearch.searchOptionToFilterTarget(
      optionParam,
      filterParam,
      selectedCodeParam
    );
    expect(result).toEqual(resultSearchOptionFilterTargetSelectedMultiple);
  });
});

describe("ItemSearch.getTechnologyTypeCodes", () => {
  it("empty type code", () => {
    const searchParam: SearchAPIParamsModel = {};

    const result = ItemSearch.getTechnologyTypeCodes(searchParam);
    expect(result).toEqual([]);
  });

  it("type code CAT", () => {
    const searchParam: SearchAPIParamsModel = { catOnly: false };

    const result = ItemSearch.getTechnologyTypeCodes(searchParam);
    expect(result).toEqual(["CAT"]);
  });

  it("type code Performance", () => {
    const searchParam: SearchAPIParamsModel = { performanceOnly: false };

    const result = ItemSearch.getTechnologyTypeCodes(searchParam);
    expect(result).toEqual(["Performance"]);
  });

  it("type code CAT & Performance", () => {
    const searchParam: SearchAPIParamsModel = {
      performanceOnly: false,
      catOnly: false
    };

    const result = ItemSearch.getTechnologyTypeCodes(searchParam);
    expect(result).toEqual(["CAT", "Performance"]);
  });
});

describe("ItemSearch.getFilterOptionModel", () => {
  it("claims options", () => {
    const filterParam: SearchFilterModelTypes = {
      label: "claims",
      code: FilterType.Claim,
      filterOptions: claimsMocks
    };
    const searchApiParam = mockSeachAPI;

    const result = ItemSearch.getFilterOptionModel(filterParam, searchApiParam);
    expect(result).toEqual(resultFilterOptionModelClaim);
  });

  it("InteractionType options", () => {
    const filterParam: SearchFilterModelTypes = {
      label: "InteractionType",
      code: FilterType.InteractionType,
      filterOptions: genericSearchStringTypes
    };
    const searchApiParam = mockSeachAPI;

    const result = ItemSearch.getFilterOptionModel(filterParam, searchApiParam);
    expect(result).toEqual(resultFilterOptionModelIT);
  });

  it("Subject options", () => {
    const filterParam: SearchFilterModelTypes = {
      label: "Subject",
      code: FilterType.Subject,
      filterOptions: genericSearchStringTypes
    };
    const searchApiParam = mockSeachAPI;

    const result = ItemSearch.getFilterOptionModel(filterParam, searchApiParam);
    expect(result).toEqual(resultFilterOptionModelSubject);
  });

  it("Grade options", () => {
    const filterParam: SearchFilterModelTypes = {
      label: "Grade",
      code: FilterType.Grade,
      filterOptions: gradeSearchStringTypes
    };
    const searchApiParam = mockSeachAPI;

    const result = ItemSearch.getFilterOptionModel(filterParam, searchApiParam);
    expect(result).toEqual(resultFilterOptionModelGrade);
  });

  it("Target options", () => {
    const filterParam: SearchFilterModelTypes = {
      label: "Target",
      code: FilterType.Target,
      filterOptions: targetSearchStringTypes
    };
    const searchApiParam = mockSeachAPI;

    const result = ItemSearch.getFilterOptionModel(filterParam, searchApiParam);
    expect(result).toEqual(resultFilterOptionModeltarget);
  });

  it("TechnologyType options", () => {
    const filterParam: SearchFilterModelTypes = {
      label: "TechnologyType",
      code: FilterType.TechnologyType,
      filterOptions: techtypeSearchStringTypes
    };
    const searchApiParam = mockSeachAPI;

    const result = ItemSearch.getFilterOptionModel(filterParam, searchApiParam);
    expect(result).toEqual(resultFilterOptionModelTechType);
  });
});
