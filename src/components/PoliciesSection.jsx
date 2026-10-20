import React from 'react';
import { mockPolicies } from '../data/mockData';

export default function PoliciesSection({ onOpenEngrave }) {
  return (
    <section className="policies-section">
      <div className="container">
        <div className="policies-grid">
          {mockPolicies.map((policy, idx) => (
            <div
              key={idx}
              className={`policy-card ${idx === 2 ? 'clickable-engrave' : ''}`}
              onClick={idx === 2 ? onOpenEngrave : undefined}
              title={idx === 2 ? 'Bấm để thử nghiệm tính năng khắc tên' : undefined}
            >
              <div className="policy-icon-box">
                <img
                  src={policy.icon}
                  alt={policy.title}
                  className="policy-icon"
                  width="40"
                  height="40"
                  loading="lazy"
                />
              </div>
              <div className="policy-content">
                <h4 className="policy-title">{policy.title}</h4>
                <p className="policy-desc">{policy.subtitle}</p>
                {idx === 2 && (
                  <span className="policy-action-hint">Bấm thử xem mẫu khắc &rarr;</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
