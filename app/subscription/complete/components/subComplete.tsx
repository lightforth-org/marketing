"use client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Broken from "./broken";
import Navbar from "./navbar";
import Success from "./success";

function SubComplete() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const contactId = searchParams.get("contact_id") || null;
  const status = searchParams.get("status") || null;

  const updateContactToTrial = async (contactId: string) => {
    await axios.put(
      `https://rest.gohighlevel.com/v1/contacts/${contactId}`,
      {
        tags: ["quiz-trial"],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GHL_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
  };
  useEffect(() => {
    const requiredParams = ["contact_id", "status"];
    const isMissing = requiredParams.some((param) => !searchParams.get(param));

    if (isMissing) {
      // Redirect to the 404 page
      router.replace("/not-found"); // this is the special 404 route in App Router
    }
    if (contactId) {
      updateContactToTrial(contactId);
    }
  }, [contactId, router, searchParams]);

  return (
    <div className="w-full min-h-dvh grid place-items-center">
      {/* navbar */}
      <Navbar />
      {/* main content */}
      {status === "success" ? <Success /> : <Broken />}
    </div>
  );
}

export default SubComplete;
