import axios from "axios";

export const updateContactToTrial = async (
  contactId: string,
  tags: string[]
) => {
  await axios.put(
    `https://rest.gohighlevel.com/v1/contacts/${contactId}`,
    {
      tags,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GHL_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const updateContactToDroppedOff = async (
  contactId: string,
  tags: string[]
) => {
  await axios.put(
    `https://rest.gohighlevel.com/v1/contacts/${contactId}`,
    {
      tags,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GHL_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const createLead = async <T>(formData: T, tags: string[]) => {
  const response = await axios.post(
    "https://rest.gohighlevel.com/v1/contacts/",
    {
      ...formData,
      tags,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GHL_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data?.contact?.id;
};
