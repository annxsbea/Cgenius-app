import { StackNavigationProp } from "@react-navigation/stack";
import { NavigatorScreenParams, RouteProp } from "@react-navigation/native";
import { UserDetails, ListClientsResponse } from "./apis";

// Tipagens para MainStack
export type MainStackParamList = {
  Home: { user: UserDetails };
  Search: undefined;
  Profile: undefined;
  DetailsClient: { client: ListClientsResponse };
  TestePerson: undefined;     
  ResultadoPerfil:{ perfil: string }; 
};

// Tipagens para RootStack
export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Main: NavigatorScreenParams<MainStackParamList>;
};

// Tipagens para navegação
export type HomeScreenProp = StackNavigationProp<MainStackParamList, 'Home'>;
export type DetailsClientNavigationProp = StackNavigationProp<MainStackParamList, 'DetailsClient'>;
export type TestePersonScreenProp = StackNavigationProp<MainStackParamList, 'TestePerson'>;
export type SignInScreenProp = StackNavigationProp<RootStackParamList, 'SignIn'>;
export type SignUpScreenProp = StackNavigationProp<RootStackParamList, 'SignUp'>;
export type ProfileScreenProp = StackNavigationProp<MainStackParamList, 'Profile'>;
export type ResultadoPerfilScreen = StackNavigationProp<MainStackParamList, 'ResultadoPerfil'>;

// Tipagens para rotas
export type HomeScreenRouteProp = RouteProp<MainStackParamList, 'Home'>;
export type DetailsClientRouteProp = RouteProp<MainStackParamList, 'DetailsClient'>;
export type TestePersonRouteProp = RouteProp<MainStackParamList, 'TestePerson'>;
export type ProfileScreenRouteProp = RouteProp<MainStackParamList, 'Profile'>;
export type ResultadoPerfilRouteProp = RouteProp<MainStackParamList, 'ResultadoPerfil'>;
