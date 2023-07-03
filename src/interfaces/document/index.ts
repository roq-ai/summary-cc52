import { SuggestionInterface } from 'interfaces/suggestion';
import { OrganizationInterface } from 'interfaces/organization';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface DocumentInterface {
  id?: string;
  content: string;
  summary?: string;
  paraphrase?: string;
  organization_id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  suggestion?: SuggestionInterface[];
  organization?: OrganizationInterface;
  user?: UserInterface;
  _count?: {
    suggestion?: number;
  };
}

export interface DocumentGetQueryInterface extends GetQueryInterface {
  id?: string;
  content?: string;
  summary?: string;
  paraphrase?: string;
  organization_id?: string;
  user_id?: string;
}
