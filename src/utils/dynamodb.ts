import { ShortURL } from "../types/shorturl";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand
} from "@aws-sdk/lib-dynamodb";

const linkTable = process.env.LINK_TABLE as string;
// const dynamodb = new DynamoDB.DocumentClient();
const dynamodb = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(dynamodb);

export async function putShortUrl(shortURL: ShortURL): Promise<boolean> {
  if (!linkTable || linkTable == "") {
    throw new Error("'LINK_TABLE' Environment Variable Not Set");
  }
  const putCommand = new PutCommand({
    TableName: linkTable,
    Item: {
      ...shortURL,
    },
    ConditionExpression: "attribute_not_exists(id)",
  });
  await docClient.send(putCommand);
  return true;

  // await dynamodb
  //   .put({
  //     TableName: linkTable,
  //     Item: {
  //       ...shortURL,
  //     },
  //     ConditionExpression: "attribute_not_exists(id)",
  //   })
  //   .promise();

  // return true;
}

export async function getShortUrl(id: string): Promise<ShortURL | null> {
  if (!linkTable || linkTable == "") {
    throw new Error("'LINK_TABLE' Environment Variable Not Set");
  }
  try {
    const getCommand = new GetCommand({
      TableName: linkTable,
      Key: {
        id,
      },
    });
    const getResponse = await docClient.send(getCommand);
    return getResponse.Item as ShortURL;
    

    // const resp = await dynamodb
    //   .get({
    //     TableName: linkTable,
    //     Key: {
    //       id,
    //     },
    //   })
    //   .promise();
    // return resp.Item as ShortURL;
  } catch (error) {}
  return null;
}

export async function getAllUrls(): Promise<[ShortURL] | null> {
  if (!linkTable || linkTable == "") {
    throw new Error("'LINK_TABLE' Environment Variable Not Set");
  }
  try {
    const scanCommand = new ScanCommand({
      TableName: linkTable,
    })
    const getResponse = await docClient.send(scanCommand);
    console.log("RETURNED ITEMS COUNT", getResponse.Items ? getResponse.Items.length : 0);
    return getResponse.Items as [ShortURL];



    // const resp = await dynamodb
    //   .scan({
    //     TableName: linkTable,
    //   })
    //   .promise();
    // console.log("RETURNED ITEMS COUNT", resp.Items ? resp.Items.length : 0);
    // return resp.Items as [ShortURL];
  } catch (error) {}
  return null;
}
