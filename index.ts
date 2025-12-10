import { Stagehand } from "@browserbasehq/stagehand";
import StagehandConfig from "./stagehand.config";
import { z } from "zod";

async function main() {
  const stagehand = new Stagehand(StagehandConfig);
  await stagehand.init();
  const page = stagehand.page;

  const websiteUrl = process.argv[2];
  if (!websiteUrl) {
    console.error("Please provide a website URL as a command line argument");
    process.exit(1);
  }

  await page.goto(websiteUrl);
  await page.waitForLoadState("networkidle");

  const [contactAction] = await page.observe(
    "Click on the contact page link or button"
  );
  await page.act(contactAction);
  await page.waitForLoadState("networkidle");

  const formData = await page.extract({
    instruction: "Identify all form fields in the contact form.",
    schema: z.object({
      fields: z.array(
        z.object({
          label: z
            .string()
            .describe("The label or placeholder text for the field"),
          type: z
            .string()
            .describe(
              "The field type: text, email, tel, textarea, select, etc."
            ),
          required: z.boolean().describe("Whether the field is required"),
        })
      ),
    }),
    useTextExtract: false,
  });

  for (const field of formData.fields) {
    await page.act(
      `Fill the ${field.label} field (type: ${field.type}) with appropriate realistic data`
    );
    await page.waitForTimeout(500);
  }

  await page.act("Click the submit button");
  await page.waitForTimeout(3000);

  await stagehand.close();
}

main().catch(console.error);
