import { useEffect, useState, useRef } from "react";
import { Mail, Phone, MapPin, Clock, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function HeroSection() {
  return (
    <section className="py-20 lg:py-24 bg-gradient-to-br from-primary/10 via-background to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <Badge variant="secondary" className="mb-6">Contact Us</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-6" data-testid="text-contact-title">
            Let's Start a <span className="text-primary">Conversation</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed" data-testid="text-contact-description">
            Whether you need IT support, want to discuss a project, or simply have questions, we're here to help. Reach out and let's explore how we can support your business.
          </p>
        </div>
      </div>
    </section>
  );
}

function generateCaptcha() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  return { num1, num2, answer: num1 + num2 };
}

function ContactFormSection() {
  const [captcha, setCaptcha] = useState(generateCaptcha);
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaInput("");
    setCaptchaError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    const userAnswer = parseInt(captchaInput, 10);
    if (isNaN(userAnswer) || userAnswer !== captcha.answer) {
      e.preventDefault();
      setCaptchaError("Incorrect answer. Please try again.");
      refreshCaptcha();
      return false;
    }
    setCaptchaError("");
    return true;
  };

  useEffect(() => {
    // Load Zoho SalesIQ and analytics scripts
    const loadZohoScripts = () => {
      // SalesIQ Widget
      if (!document.getElementById('zsiqscript')) {
        const $zoho = (window as any).$zoho || {};
        $zoho.salesiq = $zoho.salesiq || {
          widgetcode: 'siq748ce5a0c4cd5e6cd6af65485a38f68624081e79d63be95a88b024f84dcc05a9',
          values: {},
          ready: function() {}
        };
        (window as any).$zoho = $zoho;

        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.id = 'zsiqscript';
        s.defer = true;
        s.src = 'https://salesiq.zoho.com/widget';
        document.body.appendChild(s);
      }

      // Analytics script
      if (!document.getElementById('wf_anal')) {
        const analyticsScript = document.createElement('script');
        analyticsScript.id = 'wf_anal';
        analyticsScript.src = 'https://crm.zohopublic.com/crm/WebFormAnalyticsServeServlet?rid=283674d59ca6a195a11582a2988d1d4f1422cc761e8aa09ad4120ef7a81b5d809a201df4a31e6c6e023b4fcbad6afa16gid818bb654c5755433d0d900ccc5f799e4330a61fac85bcca7170638a1f2c56346gidff666c1dfae5244c89b443aad7027a58e321f549190b45274b50e01bbad44c32gid54d416fe1e64027c8dcd60de3b68dba6fda02ddee0fbfc53d548ed318a98fc7a&tw=01e6eab9a9b368a8df596ef615f53d71fe8b1236b488059c75aa711fa5b19506';
        document.body.appendChild(analyticsScript);
      }
    };

    loadZohoScripts();

    // Define global functions for Zoho form
    (window as any).addAriaSelected1691948000001924023 = function() {
      const optionElem = (event as any).target;
      const previousSelectedOption = optionElem.querySelector('[aria-selected=true]');
      if (previousSelectedOption) {
        previousSelectedOption.removeAttribute('aria-selected');
      }
      optionElem.querySelectorAll('option')[optionElem.selectedIndex].ariaSelected = 'true';
    };

    (window as any).validateEmail1691948000001924023 = function() {
      const form = document.forms['WebToLeads1691948000001924023' as any];
      const emailFld = form.querySelectorAll('[ftype=email]');
      for (let i = 0; i < emailFld.length; i++) {
        const emailVal = (emailFld[i] as HTMLInputElement).value;
        if ((emailVal.replace(/^\s+|\s+$/g, '')).length !== 0) {
          const atpos = emailVal.indexOf('@');
          const dotpos = emailVal.lastIndexOf('.');
          if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= emailVal.length) {
            alert('Please enter a valid email address.');
            (emailFld[i] as HTMLInputElement).focus();
            return false;
          }
        }
      }
      return true;
    };

    (window as any).trackVisitor1691948000001924023 = function() {
      try {
        const $zoho = (window as any).$zoho;
        if ($zoho && $zoho.salesiq) {
          const form = document.forms['WebToLeads1691948000001924023' as any];
          const LDTuvidObj = form['LDTuvid'];
          if (LDTuvidObj && $zoho.salesiq.visitor) {
            LDTuvidObj.value = $zoho.salesiq.visitor.uniqueid();
          }
          let name = '';
          const lastnameObj = form['Last Name'];
          if (lastnameObj) {
            name = lastnameObj.value;
          }
          const firstnameObj = form['First Name'];
          if (firstnameObj) {
            name = firstnameObj.value + ' ' + name;
          }
          if ($zoho.salesiq.visitor) {
            $zoho.salesiq.visitor.name(name);
          }
          const emailObj = form['Email'];
          if (emailObj && $zoho.salesiq.visitor) {
            $zoho.salesiq.visitor.email(emailObj.value);
          }
        }
      } catch (e) {
        console.error('Error tracking visitor:', e);
      }
    };

    (window as any).checkMandatory1691948000001924023 = function() {
      const mndFileds = ['Company', 'Last Name'];
      const fldLangVal = ['Company', 'Last Name'];
      const form = document.forms['WebToLeads1691948000001924023' as any];
      
      for (let i = 0; i < mndFileds.length; i++) {
        const fieldObj = form[mndFileds[i]];
        if (fieldObj) {
          if (((fieldObj.value).replace(/^\s+|\s+$/g, '')).length === 0) {
            if (fieldObj.type === 'file') {
              alert('Please select a file to upload.');
              fieldObj.focus();
              return false;
            }
            alert(fldLangVal[i] + ' cannot be empty.');
            fieldObj.focus();
            return false;
          } else if (fieldObj.nodeName === 'SELECT') {
            if (fieldObj.options[fieldObj.selectedIndex].value === '-None-') {
              alert(fldLangVal[i] + ' cannot be none.');
              fieldObj.focus();
              return false;
            }
          } else if (fieldObj.type === 'checkbox') {
            if (fieldObj.checked === false) {
              alert('Please accept ' + fldLangVal[i]);
              fieldObj.focus();
              return false;
            }
          }
        }
      }
      
      (window as any).trackVisitor1691948000001924023();
      
      if (!(window as any).validateEmail1691948000001924023()) {
        return false;
      }
      
      const urlparams = new URLSearchParams(window.location.search);
      if (urlparams.has('service') && urlparams.get('service') === 'smarturl') {
        const webform = document.getElementById('webform1691948000001924023');
        const service = urlparams.get('service');
        const smarturlfield = document.createElement('input');
        smarturlfield.setAttribute('type', 'hidden');
        smarturlfield.setAttribute('value', service || '');
        smarturlfield.setAttribute('name', 'service');
        webform?.appendChild(smarturlfield);
      }
      
      const submitBtn = document.querySelector('.crmWebToEntityForm .formsubmit');
      if (submitBtn) {
        submitBtn.setAttribute('disabled', 'true');
      }
      
      return true;
    };
  }, []);

  return (
    <Card id="contact-form" data-testid="card-contact-form">
      <CardContent className="p-6 lg:p-8">
        <style dangerouslySetInnerHTML={{ __html: `
          .zcwf_lblLeft {
            width: 100%;
            box-sizing: border-box;
          }
          .zcwf_lblLeft * {
            box-sizing: border-box;
          }
          .zcwf_lblLeft {
            text-align: left;
          }
          .zcwf_lblLeft * {
            direction: ltr;
          }
          .zcwf_lblLeft .zcwf_title {
            word-wrap: break-word;
            padding: 0px 0px 10px;
            font-weight: bold;
          }
          .zcwf_lblLeft .zcwf_col_fld input[type=text],
          .zcwf_lblLeft .zcwf_col_fld input[type=email],
          .zcwf_lblLeft .zcwf_col_fld input[type=tel],
          .zcwf_lblLeft .zcwf_col_fld textarea {
            width: 100%;
            border: 1px solid hsl(var(--border)) !important;
            background: hsl(var(--background));
            color: hsl(var(--foreground));
            resize: vertical;
            border-radius: 6px;
            padding: 10px 12px;
            font-size: 14px;
          }
          .zcwf_lblLeft .zcwf_col_fld input:focus,
          .zcwf_lblLeft .zcwf_col_fld textarea:focus {
            outline: none;
            border-color: hsl(var(--primary)) !important;
            box-shadow: 0 0 0 2px hsl(var(--primary) / 0.2);
          }
          .zcwf_lblLeft .zcwf_col_lab {
            width: 100%;
            word-break: break-word;
            padding: 0px;
            margin-bottom: 6px;
            font-weight: 500;
            font-size: 14px;
            color: hsl(var(--foreground));
          }
          .zcwf_lblLeft .zcwf_col_fld {
            width: 100%;
            padding: 0px;
            position: relative;
            margin-bottom: 4px;
          }
          .zcwf_lblLeft .wfrm_fld_dpNn {
            display: none;
          }
          .zcwf_lblLeft .zcwf_col_fld_slt {
            width: 100%;
            border: 1px solid hsl(var(--border));
            background: hsl(var(--background));
            color: hsl(var(--foreground));
            border-radius: 6px;
            font-size: 14px;
            padding: 10px 12px;
          }
          .zcwf_lblLeft .zcwf_row:after,
          .zcwf_lblLeft .zcwf_col_fld:after {
            content: '';
            display: table;
            clear: both;
          }
          .zcwf_lblLeft .zcwf_col_help {
            display: none;
          }
          .zcwf_lblLeft .zcwf_row {
            margin: 16px 0px;
          }
          .zcwf_lblLeft .formsubmit {
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            padding: 10px 24px;
            border-radius: 6px;
            border: none;
          }
          .zcwf_lblLeft .formsubmit.zcwf_button {
            color: white !important;
            background: hsl(var(--primary));
          }
          .zcwf_lblLeft .formsubmit.zcwf_button:hover {
            opacity: 0.9;
          }
          .zcwf_lblLeft .formsubmit.zcwf_button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }
          .zcwf_lblLeft input[type=reset].zcwf_button {
            background: hsl(var(--muted));
            color: hsl(var(--muted-foreground)) !important;
            border: 1px solid hsl(var(--border));
            margin-left: 8px;
          }
          .zcwf_lblLeft .zcwf_privacy_txt {
            font-size: 12px;
            color: hsl(var(--muted-foreground));
          }
          .captcha-container {
            background: hsl(var(--muted));
            border: 1px solid hsl(var(--border));
            border-radius: 8px;
            padding: 16px;
            margin: 16px 0;
          }
          .captcha-question {
            font-size: 18px;
            font-weight: 600;
            color: hsl(var(--foreground));
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .captcha-input {
            width: 100px;
            padding: 8px 12px;
            border: 1px solid hsl(var(--border));
            border-radius: 6px;
            font-size: 16px;
            background: hsl(var(--background));
            color: hsl(var(--foreground));
          }
          .captcha-input:focus {
            outline: none;
            border-color: hsl(var(--primary));
            box-shadow: 0 0 0 2px hsl(var(--primary) / 0.2);
          }
          .captcha-error {
            color: hsl(var(--destructive));
            font-size: 14px;
            margin-top: 8px;
          }
          .captcha-label {
            font-size: 14px;
            color: hsl(var(--muted-foreground));
            margin-bottom: 8px;
          }
        `}} />
        
        <div className="zcwf_lblLeft crmWebToEntityForm">
          <div className="zcwf_title text-2xl font-bold mb-6 text-foreground">Send Us a Message</div>
          <form 
            ref={formRef}
            id="webform1691948000001924023" 
            action="https://crm.zoho.com/crm/WebToLeadForm" 
            name="WebToLeads1691948000001924023" 
            method="POST" 
            onSubmit={(e) => {
              if (!handleSubmit(e)) return;
              return (window as any).checkMandatory1691948000001924023();
            }}
            acceptCharset="UTF-8"
            data-testid="form-contact"
          >
            <input type="text" style={{ display: 'none' }} name="xnQsjsdp" defaultValue="42865c4356d40c3dad14a7f6e83f0cc265671ef87895923b19588c3e18f96d86" />
            <input type="hidden" name="zc_gad" id="zc_gad" defaultValue="" />
            <input type="text" style={{ display: 'none' }} name="xmIwtLD" defaultValue="1ca9091a527cf9b3827acbeff3378d0aed40da4859f52fc97c8ec6fa3d6222ae3b871800401b98c16e965eca3f591864" />
            <input type="text" style={{ display: 'none' }} name="actionType" defaultValue="TGVhZHM=" />
            <input type="text" style={{ display: 'none' }} name="returnURL" defaultValue="https://vertisjm.com" />
            <input type="text" style={{ display: 'none' }} id="ldeskuid" name="ldeskuid" />
            <input type="text" style={{ display: 'none' }} id="LDTuvid" name="LDTuvid" />

            <div className="zcwf_row">
              <div className="zcwf_col_lab">
                <label htmlFor="Company">Company <span className="text-destructive">*</span></label>
              </div>
              <div className="zcwf_col_fld">
                <input type="text" id="Company" aria-required="true" aria-label="Company" name="Company" maxLength={200} data-testid="input-company" />
              </div>
            </div>

            <div className="zcwf_row">
              <div className="zcwf_col_lab">
                <label htmlFor="First_Name">First Name</label>
              </div>
              <div className="zcwf_col_fld">
                <input type="text" id="First_Name" aria-required="false" aria-label="First Name" name="First Name" maxLength={40} data-testid="input-first-name" />
              </div>
            </div>

            <div className="zcwf_row">
              <div className="zcwf_col_lab">
                <label htmlFor="Last_Name">Last Name <span className="text-destructive">*</span></label>
              </div>
              <div className="zcwf_col_fld">
                <input type="text" id="Last_Name" aria-required="true" aria-label="Last Name" name="Last Name" maxLength={80} data-testid="input-last-name" />
              </div>
            </div>

            <div className="zcwf_row">
              <div className="zcwf_col_lab">
                <label htmlFor="Email">Email</label>
              </div>
              <div className="zcwf_col_fld">
                <input type="text" id="Email" aria-required="false" aria-label="Email" name="Email" maxLength={100} data-testid="input-email" />
              </div>
            </div>

            <div className="zcwf_row">
              <div className="zcwf_col_lab">
                <label htmlFor="Phone">Phone</label>
              </div>
              <div className="zcwf_col_fld">
                <input type="text" id="Phone" aria-required="false" aria-label="Phone" name="Phone" maxLength={30} data-testid="input-phone" />
              </div>
            </div>

            <div className="zcwf_row wfrm_fld_dpNn">
              <div className="zcwf_col_lab">
                <label htmlFor="Lead_Source">Lead Source</label>
              </div>
              <div className="zcwf_col_fld">
                <select className="zcwf_col_fld_slt" id="Lead_Source" aria-required="false" aria-label="Lead Source" name="Lead Source" defaultValue="OnlineStore">
                  <option value="-None-">-None-</option>
                  <option value="Advertisement">Advertisement</option>
                  <option value="Cold Call">Cold Call</option>
                  <option value="Employee Referral">Employee Referral</option>
                  <option value="External Referral">External Referral</option>
                  <option value="OnlineStore">OnlineStore</option>
                  <option value="Partner">Partner</option>
                  <option value="Public Relations">Public Relations</option>
                  <option value="Sales Mail Alias">Sales Mail Alias</option>
                  <option value="Seminar Partner">Seminar Partner</option>
                  <option value="Seminar-Internal">Seminar-Internal</option>
                  <option value="Trade Show">Trade Show</option>
                  <option value="Web Download">Web Download</option>
                  <option value="Web Research">Web Research</option>
                  <option value="Chat">Chat</option>
                </select>
              </div>
            </div>

            <div className="zcwf_row">
              <div className="zcwf_col_lab">
                <label htmlFor="Description">Message</label>
              </div>
              <div className="zcwf_col_fld">
                <textarea id="Description" aria-required="false" aria-label="Description" name="Description" rows={4} data-testid="input-description" />
              </div>
            </div>

            <input type="hidden" name="aG9uZXlwb3Q" defaultValue="" />

            {/* CAPTCHA Section */}
            <div className="captcha-container" data-testid="captcha-container">
              <div className="captcha-label">Please verify you're human</div>
              <div className="captcha-question">
                <span>What is {captcha.num1} + {captcha.num2}?</span>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon"
                  onClick={refreshCaptcha}
                  aria-label="Refresh captcha"
                  data-testid="button-refresh-captcha"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              <input 
                type="text" 
                className="captcha-input"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                placeholder="Answer"
                aria-label="Captcha answer"
                data-testid="input-captcha"
                required
              />
              {captchaError && <div className="captcha-error" data-testid="text-captcha-error">{captchaError}</div>}
            </div>

            <div className="zcwf_row">
              <div className="zcwf_col_fld flex flex-wrap gap-2">
                <input type="submit" id="formsubmit" className="formsubmit zcwf_button" value="Submit" aria-label="Submit" title="Submit" data-testid="button-submit" />
                <input type="reset" className="zcwf_button" name="reset" value="Reset" aria-label="Reset" title="Reset" onClick={refreshCaptcha} data-testid="button-reset" />
              </div>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}

function ContactInfoSection() {
  return (
    <div className="space-y-6">
      <Card data-testid="card-contact-info">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-6">Contact Information</h3>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium mb-1">Office Address</p>
                <p className="text-sm text-muted-foreground">
                  1b Braemar Avenue<br />
                  Kingston 10, Jamaica
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium mb-1">Phone</p>
                <a href="tel:+18766348700" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-phone">
                  +1 (876) 634-8700
                </a>
                <br />
                <a href="tel:+18766348699" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-phone-alt">
                  +1 (876) 634-8699
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium mb-1">Email</p>
                <a href="mailto:sales@vertisjm.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-email">
                  sales@vertisjm.com
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium mb-1">Office Hours</p>
                <p className="text-sm text-muted-foreground">
                  Monday - Friday: 8:00 AM - 5:00 PM<br />
                  Weekend: Emergency Support Only
                </p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card data-testid="card-map">
        <CardContent className="p-0 overflow-hidden">
          <div className="aspect-[4/3] bg-muted">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1897.2!2d-76.7877!3d18.0085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8edb3f8d9c8a2f1b%3A0x0!2sBraemar%20Avenue%2C%20Kingston%2010%2C%20Jamaica!5e0!3m2!1sen!2s!4v1702234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Vertis Technology Office Location"
              className="rounded-b-lg"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Contact() {
  return (
    <>
      <HeroSection />
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <ContactFormSection />
            </div>
            <div className="lg:col-span-2">
              <ContactInfoSection />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
