"use client";
import { updateContactToTrial } from "@/lib/ghlActions";
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
  const funnelName = searchParams.get("funnelName") || null;
  const email = searchParams.get("email") || null;

  useEffect(() => {
    const trailTags =
      funnelName === "autoApply" ? ["F2-auto-trial"] : ["F3-vbp-trial"];

    const requiredParams = ["contact_id", "status"];
    const isMissing = requiredParams.some((param) => !searchParams.get(param));

    if (isMissing) {
      // Redirect to the 404 page
      router.replace("/not-found"); // this is the special 404 route in App Router
    }
    if (contactId) {
      updateContactToTrial(contactId, trailTags);
    }
  }, [contactId, router, searchParams, funnelName]);

  return (
    <div className="w-full min-h-dvh grid place-items-center">
      {/* navbar */}
      <Navbar />
      {/* main content */}
      {status === "success" ? <Success email={email} /> : <Broken />}
    </div>
  );
}

export default SubComplete;
