import { useEffect, useRef } from "react";
import { ArrowRight, Clock, Headphones, Mail, MapPin, Phone, RefreshCw } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { industries } from "@/lib/data";
import { Container, PageHero, PillLink, Reveal, SUPPORT_PORTAL_URL, contact, pillClass, scrollToId } from "@/components/site";

import heroImage from "@assets/stock_images/hero-it-server-room.jpg";
import coverageMap from "@assets/caribbean-map-light.svg";

const fieldCls =
  "h-12 w-full rounded-lg border border-line-strong bg-white px-3.5 text-[15px] text-ink placeholder:text-slate-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/25";
const labelCls = "text-sm font-semibold text-ink";

function Required() {
  return (
    <span className="text-[#B42318]" aria-hidden="true">
      {" "}*
    </span>
  );
}

const faqs = [
  {
    q: "How quickly can you respond to a new enquiry?",
    a: `Our team reviews new enquiries Monday to Friday, 8:00 AM – 5:00 PM. If you need urgent help with a system we already support, call ${contact.phones[0].label} or open a ticket in the Support Portal.`,
  },
  {
    q: "Do you provide support outside of Jamaica?",
    a: "Yes. We work with organisations across Jamaica and the wider Caribbean. Tell us where you're based and what you need, and we'll explain how we can support you.",
  },
  {
    q: "What industries do you work with?",
    a: `We serve ${industries.slice(0, -1).join(", ").toLowerCase()} and ${industries[industries.length - 1].toLowerCase()} organisations, among others.`,
  },
  {
    q: "Do you offer on-site and remote support?",
    a: "Yes. Our help desk resolves many issues remotely, and our engineers work on site for installations, infrastructure projects and problems that need hands-on attention.",
  },
];

function ContactFormSection() {
  const captchaRef = useRef<HTMLImageElement>(null);

  const reloadCaptcha = () => {
    if (captchaRef.current) {
      const src = captchaRef.current.src;
      if (src.indexOf('&d') !== -1) {
        captchaRef.current.src = src.substring(0, src.indexOf('&d')) + '&d' + new Date().getTime();
      } else {
        captchaRef.current.src = src + '&d' + new Date().getTime();
      }
    }
  };

  useEffect(() => {
    const validateEmail = () => {
      const form = document.forms.namedItem('WebToLeads1691948000001924023');
      if (!form) return true;
      const emailFld = form.querySelectorAll('[data-ftype="email"]');
      for (let i = 0; i < emailFld.length; i++) {
        const emailInput = emailFld[i] as HTMLInputElement;
        const emailVal = emailInput.value;
        if (emailVal.replace(/^\s+|\s+$/g, '').length !== 0) {
          const atpos = emailVal.indexOf('@');
          const dotpos = emailVal.lastIndexOf('.');
          if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= emailVal.length) {
            alert('Please enter a valid email address.');
            emailInput.focus();
            return false;
          }
        }
      }
      return true;
    };

    const historyBack = () => {
      const submitBtn = document.querySelector('.formsubmit') as HTMLButtonElement;
      if (submitBtn) {
        submitBtn.removeAttribute('disabled');
      }
      reloadCaptcha();
      window.removeEventListener('focus', historyBack);
    };

    const trackVisitor = () => {
      try {
        const $zoho = (window as any).$zoho;
        if ($zoho) {
          const form = document.forms.namedItem('WebToLeads1691948000001924023');
          if (form) {
            const LDTuvidObj = form.elements.namedItem('LDTuvid') as HTMLInputElement;
            if (LDTuvidObj && $zoho.salesiq?.visitor?.uniqueid) {
              LDTuvidObj.value = $zoho.salesiq.visitor.uniqueid();
            }
            let name = '';
            const lastnameObj = form.elements.namedItem('Last Name') as HTMLInputElement;
            if (lastnameObj) {
              name = lastnameObj.value;
            }
            const firstnameObj = form.elements.namedItem('First Name') as HTMLInputElement;
            if (firstnameObj) {
              name = firstnameObj.value + ' ' + name;
            }
            if ($zoho.salesiq?.visitor?.name) {
              $zoho.salesiq.visitor.name(name);
            }
            const emailObj = form.elements.namedItem('Email') as HTMLInputElement;
            if (emailObj && $zoho.salesiq?.visitor?.email) {
              $zoho.salesiq.visitor.email(emailObj.value);
            }
          }
        }
      } catch (e) {
        console.error(e);
      }
    };

    const checkMandatory = (e: Event) => {
      const mndFields = ['Company', 'Last Name'];
      const fldLangVal = ['Company', 'Last Name'];
      const form = document.forms.namedItem('WebToLeads1691948000001924023');
      if (!form) return true;
      
      for (let i = 0; i < mndFields.length; i++) {
        const fieldObj = form.elements.namedItem(mndFields[i]) as HTMLInputElement;
        if (fieldObj) {
          if (fieldObj.value.replace(/^\s+|\s+$/g, '').length === 0) {
            alert(fldLangVal[i] + ' cannot be empty.');
            fieldObj.focus();
            e.preventDefault();
            return false;
          }
        }
      }
      
      if (!validateEmail()) {
        e.preventDefault();
        return false;
      }

      trackVisitor();
      
      const urlparams = new URLSearchParams(window.location.search);
      if (urlparams.has('service') && urlparams.get('service') === 'smarturl') {
        const webform = document.getElementById('webform1691948000001924023');
        if (webform) {
          const service = urlparams.get('service');
          const smarturlfield = document.createElement('input');
          smarturlfield.setAttribute('type', 'hidden');
          smarturlfield.setAttribute('value', service || '');
          smarturlfield.setAttribute('name', 'service');
          webform.appendChild(smarturlfield);
        }
      }

      const submitBtn = document.querySelector('.formsubmit') as HTMLButtonElement;
      if (submitBtn) {
        submitBtn.setAttribute('disabled', 'true');
      }
      window.addEventListener('focus', historyBack);
      
      return true;
    };

    const form = document.getElementById('webform1691948000001924023');
    if (form) {
      form.addEventListener('submit', checkMandatory);
    }

    // Load analytics script
    const analyticsScript = document.createElement('script');
    analyticsScript.id = 'wf_anal';
    analyticsScript.src = 'https://crm.zohopublic.com/crm/WebFormAnalyticsServeServlet?rid=679e863ff3e97f3a451532a00589220ea60ee625fe6676cc1fc6c49dccf0bf3f998d65010409a18ff9ccbad5ec640fd5gid7cd2178fbe1121bd47e274885dd18a21716dce0b63a17c54298c981c45625e02gidcdc3c4e3eb4e61f8d94616bbe6ceb878a0279b6cd02fe0e5c6dbb6384bd81f30gid579ccd6bcad6b59ac5e4d5a3eefbcc13e8fc5e4295e9c8e4ecfc6eacc00eaeaf&tw=bbf6308683776fac498af5192205b77351434b0e0065b63370a6463442bd6737';
    document.body.appendChild(analyticsScript);

    return () => {
      if (form) {
        form.removeEventListener('submit', checkMandatory);
      }
      if (analyticsScript.parentNode) {
        analyticsScript.parentNode.removeChild(analyticsScript);
      }
    };
  }, []);

  return (
    <div
      className="flex flex-col gap-6 rounded-2xl border border-line bg-white p-6 shadow-[0_12px_32px_rgba(10,27,46,0.06)] sm:p-10"
      data-testid="card-contact-form"
    >
      <h2 className="font-display text-2xl font-bold">Get in touch</h2>
      <form
        id="webform1691948000001924023"
        action="https://crm.zoho.com/crm/WebToLeadForm"
        name="WebToLeads1691948000001924023"
        method="POST"
        acceptCharset="UTF-8"
        className="flex flex-col gap-[22px]"
        target="captchaFrame"
      >
        <input type="hidden" name="xnQsjsdp" value="3b5b6f9a5120a084799e7561fb70ee5fc096c127faee986b2a5b3e6b9a7c2396" />
        <input type="hidden" name="zc_gad" id="zc_gad" value="" />
        <input type="hidden" name="xmIwtLD" value="82dc63325867e829e189ef2e3715b723eeda9a099fc20d18651e1e176efb14e7021e53fad9c87050d7a6b2c0380137a4" />
        <input type="hidden" name="actionType" value="TGVhZHM=" />
        <input type="hidden" name="returnURL" value="null" />
        <input type="hidden" id="ldeskuid" name="ldeskuid" />
        <input type="hidden" id="LDTuvid" name="LDTuvid" />
        <input type="hidden" name="Lead Source" value="OnlineStore" />
        <input type="hidden" name="aG9uZXlwb3Q" value="" />

        <div className="flex flex-col gap-2">
          <label htmlFor="Company" className={labelCls}>
            Company<Required />
          </label>
          <input type="text" id="Company" name="Company" maxLength={200} required autoComplete="organization" className={fieldCls} data-testid="input-company" />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="First_Name" className={labelCls}>
              First name
            </label>
            <input type="text" id="First_Name" name="First Name" maxLength={40} autoComplete="given-name" className={fieldCls} data-testid="input-first-name" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="Last_Name" className={labelCls}>
              Last name<Required />
            </label>
            <input type="text" id="Last_Name" name="Last Name" maxLength={80} required autoComplete="family-name" className={fieldCls} data-testid="input-last-name" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="Email" className={labelCls}>
              Email
            </label>
            <input type="email" id="Email" name="Email" maxLength={100} data-ftype="email" autoComplete="email" className={fieldCls} data-testid="input-email" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="Phone" className={labelCls}>
              Phone
            </label>
            <input type="tel" id="Phone" name="Phone" maxLength={30} autoComplete="tel" className={fieldCls} data-testid="input-phone" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="Description" className={labelCls}>
            Message
          </label>
          <textarea
            id="Description"
            name="Description"
            rows={5}
            placeholder="Tell us about your project or inquiry..."
            className={fieldCls + " h-auto min-h-[140px] resize-y py-3"}
            data-testid="textarea-message"
          />
        </div>

        <div className="flex flex-col gap-3 rounded-[10px] border border-line bg-mist p-4">
          <label htmlFor="captchaField1691948000001924023" className={labelCls}>
            Enter the characters shown
          </label>
          <div className="flex flex-wrap items-center gap-3">
            <img
              ref={captchaRef}
              id="imgid1691948000001924023"
              src="https://crm.zoho.com/crm/CaptchaServlet?formId=82dc63325867e829e189ef2e3715b723eeda9a099fc20d18651e1e176efb14e7021e53fad9c87050d7a6b2c0380137a4&grpid=3b5b6f9a5120a084799e7561fb70ee5fc096c127faee986b2a5b3e6b9a7c2396"
              alt="Captcha image"
              className="h-12 rounded-md border border-line bg-white"
            />
            <button
              type="button"
              onClick={reloadCaptcha}
              className="flex h-11 items-center gap-2 rounded-full border border-line-strong bg-white px-4 text-sm font-semibold text-ink hover:border-ink"
              data-testid="button-reload-captcha"
            >
              <RefreshCw aria-hidden="true" className="h-4 w-4" />
              New code
            </button>
            <input
              type="text"
              id="captchaField1691948000001924023"
              name="enterdigest"
              maxLength={10}
              autoComplete="off"
              className={fieldCls + " max-w-[200px]"}
              data-testid="input-captcha"
            />
          </div>
        </div>

        <div>
          <button type="submit" className={pillClass("primary", "lg", "formsubmit w-full sm:w-auto")} data-testid="button-submit">
            Send Message
            <ArrowRight aria-hidden="true" className="h-[18px] w-[18px]" />
          </button>
        </div>
      </form>
      <iframe name="captchaFrame" style={{ display: "none" }} title="Form submission" />
    </div>
  );
}


function DetailRow({ icon: Icon, children }: { icon: typeof MapPin; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <Icon aria-hidden="true" className="mt-0.5 h-6 w-6 shrink-0 text-leaf-dark" strokeWidth={1.8} />
      <div className="flex flex-col gap-1 text-[15px]">{children}</div>
    </div>
  );
}

function ContactDetails() {
  return (
    <div className="flex flex-col gap-10" data-testid="card-contact-info">
      <div className="flex flex-col gap-6">
        <h2 className="font-display text-2xl font-bold">Contact details</h2>
        <DetailRow icon={Phone}>
          {contact.phones.map((p, i) => (
            <a key={p.href} href={p.href} className="font-semibold text-ink hover:text-brand" data-testid={i === 0 ? "link-phone" : "link-phone-alt"}>
              {p.label}
            </a>
          ))}
        </DetailRow>
        <DetailRow icon={Mail}>
          <a href={`mailto:${contact.email}`} className="font-semibold text-ink hover:text-brand" data-testid="link-email">
            {contact.email}
          </a>
          <span className="text-sm text-slate">We'll respond as soon as possible.</span>
        </DetailRow>
        <DetailRow icon={Clock}>
          <span className="font-semibold text-ink">Office hours</span>
          <span className="text-sm text-slate">
            {contact.hours[0]}
            <br />
            {contact.hours[1]}
          </span>
        </DetailRow>
        <DetailRow icon={Headphones}>
          <span className="font-semibold text-ink">Client support</span>
          <span className="text-sm text-slate">Existing clients can open and track tickets in our Support Portal.</span>
          <a href={SUPPORT_PORTAL_URL} className="text-sm font-semibold text-brand hover:text-brand-dark">
            Open the Support Portal →
          </a>
        </DetailRow>
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="font-display text-2xl font-bold">Our office</h2>
        <DetailRow icon={MapPin}>
          <span className="font-semibold text-ink">
            {contact.addressLines[0]}
            <br />
            {contact.addressLines[1]}
          </span>
          <a href={contact.directionsUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-brand hover:text-brand-dark">
            Get Directions →
          </a>
        </DetailRow>
      </div>
    </div>
  );
}

export default function Contact() {
  // Support links such as /contact#coverage from the home page.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) setTimeout(() => scrollToId(id), 60);
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title={
          <>
            Let's talk about
            <br />
            your technology needs.
          </>
        }
        body="Whether you have a question, need expert advice or want to discuss a project, our team is here to help."
        image={heroImage}
        imageAlt="IT professional working on a laptop in a server room"
      />

      <section id="contact-form" className="py-14 lg:py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <Reveal>
            <ContactFormSection />
          </Reveal>
          <Reveal delay={120}>
            <ContactDetails />
          </Reveal>
        </Container>
      </section>

      <section className="pb-14 lg:pb-24">
        <Container>
          <Reveal className="relative h-[320px] overflow-hidden rounded-2xl border border-line bg-mist lg:h-[380px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1897.2!2d-76.7877!3d18.0085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8edb3f8d9c8a2f1b%3A0x0!2sBraemar%20Avenue%2C%20Kingston%2010%2C%20Jamaica!5e0!3m2!1sen!2s!4v1702234567890"
              className="absolute inset-0 h-full w-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map showing the Vertis Technology office at 1b Braemar Avenue, Kingston 10"
            />
          </Reveal>
        </Container>
      </section>

      <section id="coverage" className="bg-mist py-14 lg:py-20">
        <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Reveal variant="left" className="flex flex-col gap-4">
            <h2 className="font-display text-3xl font-bold leading-[1.15] tracking-[-0.015em] lg:text-[34px]">
              Supporting organisations across the Caribbean.
            </h2>
            <p className="text-base leading-relaxed text-slate">
              We work with businesses, government and institutions throughout the region, delivering technology solutions
              tailored to local needs.
            </p>
            <div className="mt-2">
              <PillLink href="#contact-form" arrow size="md">
                Talk to an Expert
              </PillLink>
            </div>
          </Reveal>
          <Reveal variant="zoom" delay={120}>
            <img src={coverageMap} alt="Map of the Caribbean with Jamaica highlighted" className="w-full" />
          </Reveal>
        </Container>
      </section>

      <section className="py-14 lg:py-20">
        <Container className="flex max-w-[960px] flex-col gap-6">
          <Reveal>
            <h2 className="font-display text-3xl font-bold leading-tight lg:text-[34px]">Frequently asked questions</h2>
          </Reveal>
          <Accordion type="single" collapsible className="flex flex-col">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`faq-${i}`} className="border-b border-line">
                <AccordionTrigger className="py-5 text-left font-display text-base font-semibold text-ink hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-[15px] leading-relaxed text-slate">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </section>
    </>
  );
}
