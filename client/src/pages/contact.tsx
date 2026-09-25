import { useEffect, useRef } from "react";
import { ArrowRight, Clock, Mail, MapPin, Phone, RefreshCw } from "lucide-react";
import { Container, Eyebrow, IconBadge, PillLink, SUPPORT_PORTAL_URL, contact, pillClass } from "@/components/site";

const fieldCls =
  "h-12 w-full rounded-[10px] border border-line-strong bg-white px-3.5 text-[15px] text-ink placeholder:text-slate-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/25";
const labelCls = "text-sm font-semibold text-ink";

function Required() {
  return (
    <span className="text-[#B42318]" aria-hidden="true">
      {" "}*
    </span>
  );
}

function HeroSection() {
  return (
    <section className="flex flex-col bg-navy text-white lg:min-h-[520px] lg:flex-row">
      <div className="flex flex-col justify-center gap-6 px-5 py-16 sm:px-8 lg:w-[720px] lg:shrink-0 lg:py-20 lg:pl-20 lg:pr-16">
        <Eyebrow dark rule>
          Contact us
        </Eyebrow>
        <h1
          className="font-display text-[40px] font-bold leading-[1.06] tracking-[-0.02em] sm:text-5xl lg:text-6xl"
          data-testid="text-contact-title"
        >
          Let's start a <span className="text-leaf">conversation.</span>
        </h1>
        <p className="text-[17px] leading-relaxed text-slate-mist sm:text-[19px]" data-testid="text-contact-description">
          Whether you need IT support, want to discuss a project, or simply have questions, we're here to help. Reach out
          and let's explore how we can support your business.
        </p>
      </div>
      <div className="relative min-h-[280px] flex-1 overflow-hidden bg-navy-700 lg:rounded-bl-[160px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1897.2!2d-76.7877!3d18.0085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8edb3f8d9c8a2f1b%3A0x0!2sBraemar%20Avenue%2C%20Kingston%2010%2C%20Jamaica!5e0!3m2!1sen!2s!4v1702234567890"
          className="absolute inset-0 h-full w-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Map showing the Vertis Technology office at 1b Braemar Avenue, Kingston 10"
        />
      </div>
    </section>
  );
}

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
      className="flex flex-col gap-6 rounded-3xl border border-line bg-white p-6 shadow-[0_12px_32px_rgba(10,27,46,0.06)] sm:p-12"
      data-testid="card-contact-form"
    >
      <h2 className="font-display text-[28px] font-bold lg:text-[32px]">Send us a message</h2>
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

function InfoRow({ icon: Icon, title, children }: { icon: typeof MapPin; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <IconBadge className="h-12 w-12">
        <Icon aria-hidden="true" className="h-5 w-5" />
      </IconBadge>
      <div className="flex flex-col gap-1">
        <h3 className="font-display text-[19px] font-semibold">{title}</h3>
        {children}
      </div>
    </div>
  );
}

function ContactInfoSection() {
  return (
    <div className="flex flex-col gap-[30px] pt-2" data-testid="card-contact-info">
      <h2 className="font-display text-[28px] font-bold lg:text-[32px]">Contact information</h2>
      <InfoRow icon={MapPin} title="Office address">
        <span className="text-base leading-normal text-slate">
          {contact.addressLines[0]}
          <br />
          {contact.addressLines[1]}
        </span>
        <a href={contact.directionsUrl} target="_blank" rel="noopener noreferrer" className="text-[15px] font-semibold text-brand hover:text-brand-dark">
          Get Directions →
        </a>
      </InfoRow>
      <InfoRow icon={Phone} title="Phone">
        {contact.phones.map((p, i) => (
          <a key={p.href} href={p.href} className="text-base text-ink hover:text-brand" data-testid={i === 0 ? "link-phone" : "link-phone-alt"}>
            {p.label}
          </a>
        ))}
      </InfoRow>
      <InfoRow icon={Mail} title="Email">
        <a href={`mailto:${contact.email}`} className="text-base text-brand hover:text-brand-dark" data-testid="link-email">
          {contact.email}
        </a>
      </InfoRow>
      <InfoRow icon={Clock} title="Office hours">
        <span className="text-base leading-normal text-slate">
          {contact.hours[0]}
          <br />
          {contact.hours[1]}
        </span>
      </InfoRow>
    </div>
  );
}

function SupportSection() {
  return (
    <section id="support" className="pb-14 lg:pb-28">
      <Container className="grid grid-cols-1 gap-5 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div className="flex flex-col gap-3.5 rounded-3xl bg-navy p-8 text-white lg:p-12">
          <Eyebrow dark>Support</Eyebrow>
          <h2 className="font-display text-[28px] font-bold leading-tight lg:text-[34px]">We're here to help.</h2>
          <p className="text-base leading-relaxed text-slate-mist lg:text-[17px]">
            Need technical assistance? Our support team is available to help you resolve issues quickly.
          </p>
        </div>
        <div className="flex flex-col gap-3.5 rounded-3xl border border-line bg-mist p-8 lg:p-10">
          <h3 className="font-display text-[21px] font-semibold">Phone Support</h3>
          <p className="flex-1 text-[15px] leading-normal text-slate">Speak directly with our technical support team for urgent issues.</p>
          <div>
            <PillLink href={contact.phones[0].href} size="md">
              Call Now
            </PillLink>
          </div>
        </div>
        <div className="flex flex-col gap-3.5 rounded-3xl border border-line bg-mist p-8 lg:p-10">
          <h3 className="font-display text-[21px] font-semibold">Ticket Portal</h3>
          <p className="flex-1 text-[15px] leading-normal text-slate">Submit and track support tickets through our Zoho Desk portal.</p>
          <div>
            <PillLink href={SUPPORT_PORTAL_URL} size="md">
              Open Portal
            </PillLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function Contact() {
  return (
    <>
      <HeroSection />
      <section id="contact-form" className="py-14 lg:py-28">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <ContactFormSection />
          <ContactInfoSection />
        </Container>
      </section>
      <SupportSection />
    </>
  );
}
