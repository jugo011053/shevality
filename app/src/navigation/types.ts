import { NavigatorScreenParams } from '@react-navigation/native';

export type FeedStackParamList = {
  FeedHome: undefined;
  StoryDetail: { id: string };
  Gemerkt: undefined;
};

export type EntdeckenStackParamList = {
  EntdeckenHome: undefined; // Karte (Standard-Ansicht)
  EntdeckenList: undefined; // Liste
  BusinessDetail: { id: string };
  Suggest: undefined; // Geschäft vorschlagen
};

export type SicherStackParamList = {
  SicherHome: undefined;
};

export type RootTabParamList = {
  Feed: NavigatorScreenParams<FeedStackParamList>;
  Entdecken: NavigatorScreenParams<EntdeckenStackParamList>;
  Sicher: NavigatorScreenParams<SicherStackParamList>;
};
