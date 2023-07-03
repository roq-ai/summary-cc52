import { DocumentInterface } from 'interfaces/document';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface SuggestionInterface {
  id?: string;
  content: string;
  document_id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  document?: DocumentInterface;
  user?: UserInterface;
  _count?: {};
}

export interface SuggestionGetQueryInterface extends GetQueryInterface {
  id?: string;
  content?: string;
  document_id?: string;
  user_id?: string;
}
