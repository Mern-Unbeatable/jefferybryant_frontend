import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiCheck, FiClock, FiEdit2, FiUsers } from "react-icons/fi";
import { LuBuilding2 } from "react-icons/lu";
import PageHeader from "@/components/dashboard/PageHeader";
import Field from "@/components/dashboard/form/Field";
import SelectField from "@/components/dashboard/form/SelectField";
import { inputClass, primaryButtonClass } from "@/components/dashboard/form/formStyles";
import StatusBadge from "@/pages/dashboard/coach/components/StatusBadge";
import { CARIBBEAN_COUNTRIES } from "@/constants/countries";
import { ORGANIZATION, ORGANIZATION_TYPES } from "@/pages/dashboard/coach/coachData";
import { getInitials } from "@/utils/getInitials";

const base = "coachDashboard.organization";

const ORGANIZATION_FIELDS = ["name", "type", "country", "city", "website", "social", "ageGroups", "playersCount"];
const CONTACT_FIELDS = ["director", "role", "email", "phone", "additionalContacts"];
const INPUT_TYPES = { email: "email", phone: "tel" };

const SectionTitle = ({ icon, title, text }) => {
  const Icon = icon;
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-btn-primary/10 text-btn-primary">
        <Icon />
      </span>
      <div>
        <h2 className="text-xs">{title}</h2>
        <p className="mt-0.5 text-[10px] text-white/45">{text}</p>
      </div>
    </div>
  );
};

const MyOrganization = () => {
  const { t } = useTranslation();
  const [organization, setOrganization] = useState(ORGANIZATION);
  const [draft, setDraft] = useState(ORGANIZATION);
  const [isEditing, setIsEditing] = useState(false);

  const displayValue = (key) =>
    key === "type" ? t(`coachDashboard.organizationTypes.${organization.type}`) : organization[key];

  const startEditing = () => {
    setDraft(organization);
    setIsEditing(true);
  };

  const setField = (name, value) => setDraft((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    setOrganization(draft);
    setIsEditing(false);
  };

  const renderInput = (key) => {
    if (key === "type") {
      return (
        <SelectField
          id={key}
          name={key}
          value={draft.type}
          onChange={setField}
          options={ORGANIZATION_TYPES.map((type) => ({ value: type, label: t(`coachDashboard.organizationTypes.${type}`) }))}
        />
      );
    }
    if (key === "country") {
      return (
        <SelectField
          id={key}
          name={key}
          value={draft.country}
          onChange={setField}
          options={CARIBBEAN_COUNTRIES.map((country) => ({ value: country, label: country }))}
        />
      );
    }
    return (
      <input
        id={key}
        name={key}
        type={INPUT_TYPES[key] ?? "text"}
        required={key !== "additionalContacts" && key !== "social"}
        value={draft[key]}
        onChange={(event) => setField(key, event.target.value)}
        className={inputClass}
      />
    );
  };

  const renderFields = (keys) =>
    isEditing ? (
      <div className="grid gap-5 sm:grid-cols-2">
        {keys.map((key) => (
          <Field key={key} id={key} label={t(`${base}.fields.${key}`)}>
            {renderInput(key)}
          </Field>
        ))}
      </div>
    ) : (
      <dl className="grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
        {keys.map((key) => (
          <div key={key}>
            <dt className="text-[9px] uppercase tracking-[0.15em] text-white/40">{t(`${base}.fields.${key}`)}</dt>
            <dd className="mt-1.5 text-[11px]">{displayValue(key)}</dd>
          </div>
        ))}
      </dl>
    );

  return (
    <div className="mx-auto flex flex-col gap-5">
      <PageHeader
        eyebrow={t(`${base}.eyebrow`)}
        title={t(`${base}.title`)}
        subtitle={t(`${base}.subtitle`)}
        action={
          !isEditing && (
            <button type="button" onClick={startEditing} className={`${primaryButtonClass} flex items-center gap-2`}>
              <FiEdit2 /> {t(`${base}.edit`)}
            </button>
          )
        }
      />

      <section className="flex flex-wrap items-center gap-4 rounded-lg border border-white/10 bg-white/3 p-5">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-btn-primary font-ethnocentric text-sm text-primary">
          {getInitials(organization.name)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-base">{organization.name}</p>
          <p className="mt-0.5 text-[10px] text-white/45">
            {t(`coachDashboard.organizationTypes.${organization.type}`)} · {organization.city}, {organization.country}
          </p>
          <div className="mt-2">
            <StatusBadge status="verified">{t("coachDashboard.statuses.approved")}</StatusBadge>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[9px] uppercase tracking-[0.15em] text-white/40">{t(`${base}.orgId`)}</p>
          <p className="mt-1 font-ethnocentric text-xs text-accent">{organization.id}</p>
        </div>
      </section>

      <section>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 rounded-lg border border-white/10 bg-white/3 p-5 sm:p-6">
          <SectionTitle icon={LuBuilding2} title={t(`${base}.infoTitle`)} text={t(`${base}.infoText`)} />
          {renderFields(ORGANIZATION_FIELDS)}

          <div className="border-t border-white/10" />

          <SectionTitle icon={FiUsers} title={t(`${base}.contactTitle`)} text={t(`${base}.contactText`)} />
          {renderFields(CONTACT_FIELDS)}

          {isEditing && (
            <>
              <p className="flex gap-2.5 border-l-2 border-accent bg-accent/5 p-3 text-[10px] text-white/55">
                <FiClock className="mt-0.5 shrink-0 text-accent" />
                {t(`${base}.reviewNotice`)}
              </p>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setIsEditing(false)} className="px-3 py-2.5 text-xs text-white/60 transition hover:text-white">
                  {t("dashboardForm.cancel")}
                </button>
                <button type="submit" className={`${primaryButtonClass} flex items-center gap-2`}>
                  <FiCheck /> {t("dashboardForm.save")}
                </button>
              </div>
            </>
          )}
        </form>
      </section>
    </div>
  );
};

export default MyOrganization;
