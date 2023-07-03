const mapping: Record<string, string> = {
  documents: 'document',
  organizations: 'organization',
  suggestions: 'suggestion',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
