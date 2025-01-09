export interface UserProfile {
  _id: String;
  username: string;
  email: string;
  profileImage: string;

}
export const makeDate = (seconds: number, minutes: number, hours: number): Date => {
  const date = new Date(1970, 0, 1, hours, minutes, seconds);
  return date;
}



export const getTotalSeconds = (seconds: number, minutes: number, hours: number): number => {
  const total = hours * 3600 + minutes * 60 + seconds;
  return total;
}

export let yourQuestions = '';
export const setYourQuestions = (str: string) => {
  yourQuestions = str;
}

export let userProfile: UserProfile | null = null;
export let userProfileLoading = true;

export const setUserProfile = (user: UserProfile) => {
  userProfile = user;
  userProfileLoading = false;
}

export let freePrompt = true;
export let setFreePrompt = () => {
  const prompt = localStorage.getItem('promptdate');

  if (!prompt) {
    const newPrompt = {
      date: Date.now(),
      count: 5
    };
    localStorage.setItem('promptdate', JSON.stringify(newPrompt));
  } else {
    const parsedPrompt = JSON.parse(prompt);
    const storedDate = new Date(parsedPrompt.date);
    const currentDate = new Date();

    if (storedDate.toDateString() !== currentDate.toDateString()) {
      const updatedPrompt = {
        date: Date.now(),
        count: 5
      };
      localStorage.setItem('promptdate', JSON.stringify(updatedPrompt));
    } else {
      if (parsedPrompt.count === 0) {
        freePrompt = false;
      }
    }
  }
}

export let setfreePromptTrue = (): void => {
  freePrompt = true;
}

