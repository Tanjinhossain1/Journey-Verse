
export const formatForUrlWith_under_score = (text: string) => {
    if(text){
      const formattedTitle = text
      .split(" ")
      .map((word) => word.charAt(0) + word.slice(1))
      .join("_");
      return formattedTitle;
    }else{
      return '';
    }
  }