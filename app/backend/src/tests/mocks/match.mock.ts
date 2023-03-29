import Match from "../../database/models/match.model";
import { IAuthToken } from "../../interfaces/auth.interface";
import { IMatchTeams } from "../../interfaces/match.interface";

const tkn = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjc5NjA0OTYzLCJleHAiOjE2Nzk2MDg1NjN9.OOxE_3bhfJDszopNlDpUk039uWIWlrnzum1p91jY418';

const match = {
  id: 2,
  homeTeamId: 9,
  awayTeamId: 14,
  homeTeamGoals: 1,
  awayTeamGoals: 1,
  inProgress: true,
} as Match

const matches = [
  {
    id: 1,
    homeTeamId: 16,
    awayTeamId: 8,
    homeTeamGoals: 1,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: "São Paulo"
    },
    awayTeam: {
      teamName: "Grêmio"
    }
  },
  {
    ...match,
    homeTeam: {
      teamName: "Internacional"
    },
    awayTeam: {
      teamName: "Santos"
    }
  }] as IMatchTeams[];

const user = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  iat: 1679604963,
  exp: 1679608563
} as IAuthToken;

const newMatchBody = {
  homeTeamGoals: 2,
  awayTeamGoals: 0,
  homeTeamId: 1,
  awayTeamId: 3
}

const newMatch = {
  id: 1,
  ...newMatchBody,
  inProgress: true
} as Match

const newMatchBodyWithSameId = {
  homeTeamGoals: 2,
  awayTeamGoals: 0,
  homeTeamId: 1,
  awayTeamId: 1
}

const newMatchBodyWithInvalidId = {
  homeTeamGoals: 2,
  awayTeamGoals: 0,
  homeTeamId: 100,
  awayTeamId: 300
}

const updateMatch = {
  homeTeamGoals: 2,
  awayTeamGoals: 0,
}

export {
  tkn,
  match,
  matches,
  user,
  newMatchBody,
  newMatch,
  newMatchBodyWithSameId,
  newMatchBodyWithInvalidId,
  updateMatch
}