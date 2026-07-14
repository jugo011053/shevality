import { NavigatorScreenParams } from '@react-navigation/native';

export type FeedStackParamList = {
  FeedHome: undefined;
  StoryDetail: { id: string };
};

export type EntdeckenStackParamList = {
  EntdeckenHome: undefined;
  EntdeckenMap: undefined;
  BusinessDetail: { id: string };
};

export type SicherStackParamList = {
  SicherHome: undefined;
};

export type RootTabParamList = {
  Feed: NavigatorScreenParams<FeedStackParamList>;
  Entdecken: NavigatorScreenParams<EntdeckenStackParamList>;
  Sicher: NavigatorScreenParams<SicherStackParamList>;
};
