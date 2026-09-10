export type AccountResponse = {
  id: string;
  name: string;
  startingBalance: number;
  type: string;
  currentBalance: number;
  createdAt: string;
};

export type AccountRequest = {
  name: string;
  startingBalance: number;
  type: string;
};

export type DeleteAccountState = {
  open: boolean;
  accountId?: string;
} | null;

export type AccountsModalState =
  { mode: 'create' } | { mode: 'edit'; account: AccountResponse } | null;
