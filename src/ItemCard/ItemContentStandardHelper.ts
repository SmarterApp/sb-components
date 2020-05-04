export function getContentStandardCode(subjectCode:any, claimCode:any,  commonCoreStandardId:any, ccssDescription:any) {

    commonCoreStandardId = (commonCoreStandardId == null || commonCoreStandardId == undefined) ?  "Not Available" : commonCoreStandardId;
    ccssDescription = (ccssDescription == null || ccssDescription == undefined) ? "Content Standard information is currently unavailable for this item." : ccssDescription;
    
    //For math items and claim from 2 to 4
    if(subjectCode === 'MATH' && (claimCode == 'MATH2' || claimCode == 'MATH3' || claimCode == 'MATH4' )) {
      commonCoreStandardId = "Math Practice";
      ccssDescription = "Items in this claim primarily measure the Standards for Mathematical Practice rather than Content Standards.";
    }

    return {commonCoreStandardId, ccssDescription};
  }