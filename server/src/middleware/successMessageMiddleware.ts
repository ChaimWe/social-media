import { NextFunction, Request, Response } from "express";

function defaultSuccessMessage(statusCode: number): string {
  if (statusCode === 201) return "Created successfully";
  if (statusCode === 202) return "Accepted";
  if (statusCode === 204) return "No content";
  if (statusCode === 200) return "Request successful";
  if (statusCode >= 200 && statusCode < 300) return "Success";
  return "Request successful";
}

export default function successMessageMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const originalJson = res.json.bind(res);

  (res as any).json = (body: any) => {
    const errorHandled = res.locals?.errorHandled === true;
    if (errorHandled) {
      return originalJson(body);
    }

    const is2xx = res.statusCode >= 200 && res.statusCode < 300;

    if (is2xx && body && typeof body === "object" && !Array.isArray(body)) {
      if (!("message" in body)) {
        return originalJson({ ...body, message: defaultSuccessMessage(res.statusCode) });
      }
    }

    return originalJson(body);
  };

  next();
}

