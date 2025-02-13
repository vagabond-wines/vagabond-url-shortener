export function redirect(longUrl: string) {
  return {
    statusCode: 301,
    headers: {
      Location: longUrl,
    },
  };
}

export function _200Image(data: string) {
  return {
    statusCode: 200,
    body: data?.replace("data:image/png;base64,", ""),
    headers: {
      "Content-Type": "image/png",
    },
    isBase64Encoded: true,
  };
}

export function _200(data: any) {
  return {
    statusCode: 200,
    body: typeof data === "string" ? data : JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
}

export function _404(name: string, ID: string) {
  return {
    statusCode: 404,
    body: JSON.stringify({
      error: `${name} with ID ${ID} not found`,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
}

export function _400(err?: any) {
  return {
    statusCode: 400,
    body: JSON.stringify({
      error: err || "Bad Request",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
}

export function _500(err?: any) {
  return {
    statusCode: 500,
    body: err
      ? JSON.stringify({
          error: typeof err === "object" ? JSON.stringify(err) : err,
        })
      : "Internal Server Error",
    headers: {
      "Content-Type": "application/json",
    },
  };
}
