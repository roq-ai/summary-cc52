import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { documentValidationSchema } from 'validationSchema/documents';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getDocuments();
    case 'POST':
      return createDocument();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getDocuments() {
    const data = await prisma.document
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'document'));
    return res.status(200).json(data);
  }

  async function createDocument() {
    await documentValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.suggestion?.length > 0) {
      const create_suggestion = body.suggestion;
      body.suggestion = {
        create: create_suggestion,
      };
    } else {
      delete body.suggestion;
    }
    const data = await prisma.document.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
