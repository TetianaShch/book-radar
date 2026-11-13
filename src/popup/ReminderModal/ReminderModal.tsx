import { useEffect, useState } from "react";
import type { ReminderSettings } from "../../types/reminderSettings";
import { syncReminders } from "../../services/syncReminders";
import CloseButton from "../CloseButton/CloseButton";
import {
  defaultSettings,
  getReminderSettings,
  saveReminderSettings,
} from "../../services/settings";

import css from "./ReminderModal.module.css";

type ReminderModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ReminderModal({ isOpen, onClose }: ReminderModalProps) {
  const [settings, setSettings] = useState<ReminderSettings>(defaultSettings);

  useEffect(() => {
    if (!isOpen) return;

    const loadSettings = async () => {
      const savedSettings = await getReminderSettings();
      setSettings(savedSettings);
    };

    void loadSettings();
  }, [isOpen]);

  const handleSave = async () => {
    await saveReminderSettings(settings);
    await syncReminders();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={css.overlay}>
      <div
        className={css.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="reminder-title"
      >
        <CloseButton onClose={onClose} />
        <h2 id="reminder-title" className={css.title}>
          Нагадування
        </h2>

        <label className={css.checkboxLabel}>
          <input
            className={css.checkbox}
            type="checkbox"
            checked={settings.enabled}
            onChange={(e) =>
              setSettings({
                ...settings,
                enabled: e.target.checked,
              })
            }
          />
          Увімкнути нагадування
        </label>

        <div className={css.field}>
          <label className={css.label} htmlFor="morningTime">
            Час першого нагадування
          </label>
          <input
            className={css.input}
            type="time"
            id="morningTime"
            value={settings.morningTime}
            disabled={!settings.enabled}
            onChange={(e) =>
              setSettings({
                ...settings,
                morningTime: e.target.value,
              })
            }
          />
        </div>

        <label className={css.checkboxLabel}>
          <input
            className={css.checkbox}
            type="checkbox"
            checked={settings.eveningEnabled}
            disabled={!settings.enabled}
            onChange={(e) =>
              setSettings({
                ...settings,
                eveningEnabled: e.target.checked,
              })
            }
          />
          Друге нагадування
        </label>

        {settings.eveningEnabled && (
          <div className={css.field}>
            <label className={css.label} htmlFor="eveningTime">
              Час другого нагадування
            </label>
            <input
              className={css.input}
              type="time"
              id="eveningTime"
              value={settings.eveningTime}
              disabled={!settings.enabled}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  eveningTime: e.target.value,
                })
              }
            />
          </div>
        )}

        <div className={css.actions}>
          <button className={css.cancelButton} type="button" onClick={onClose}>
            Скасувати
          </button>

          <button className={css.button} type="button" onClick={handleSave}>
            Зберегти
          </button>
        </div>
      </div>
    </div>
  );
}
