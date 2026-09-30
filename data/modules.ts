import type { Module } from "@/lib/types";

export const modules: Module[] = [
  // Course 1: Complete React & TypeScript Masterclass
  { id: "mod-01-1", courseId: "crs-01", title: "Getting Started", description: "Set up your development environment and understand React fundamentals", order: 1, lessonsCount: 8 },
  { id: "mod-01-2", courseId: "crs-01", title: "TypeScript Essentials", description: "Type system, interfaces, generics, and advanced patterns", order: 2, lessonsCount: 12 },
  { id: "mod-01-3", courseId: "crs-01", title: "Component Architecture", description: "Composition patterns, hooks, context, and state management", order: 3, lessonsCount: 15 },
  { id: "mod-01-4", courseId: "crs-01", title: "Advanced Hooks & Patterns", description: "Custom hooks, compound components, render props, and HOCs", order: 4, lessonsCount: 12 },
  { id: "mod-01-5", courseId: "crs-01", title: "State Management with Redux Toolkit", description: "Modern Redux, RTK Query, and caching strategies", order: 5, lessonsCount: 14 },
  { id: "mod-01-6", courseId: "crs-01", title: "Testing Strategies", description: "Unit, integration, and E2E testing with Vitest and Playwright", order: 6, lessonsCount: 10 },
  { id: "mod-01-7", courseId: "crs-01", title: "Next.js 14 & App Router", description: "Server components, streaming, actions, and deployment", order: 7, lessonsCount: 8 },
  { id: "mod-01-8", courseId: "crs-01", title: "Performance & Production", description: "Optimization, monitoring, CI/CD, and real-world case studies", order: 8, lessonsCount: 6 },

  // Course 2: Machine Learning Fundamentals
  { id: "mod-02-1", courseId: "crs-02", title: "Python for Data Science", description: "NumPy, pandas, and visualization fundamentals", order: 1, lessonsCount: 10 },
  { id: "mod-02-2", courseId: "crs-02", title: "Supervised Learning", description: "Regression, classification, and model evaluation", order: 2, lessonsCount: 15 },
  { id: "mod-02-3", courseId: "crs-02", title: "Unsupervised Learning", description: "Clustering, dimensionality reduction, and anomaly detection", order: 3, lessonsCount: 10 },
  { id: "mod-02-4", courseId: "crs-02", title: "Neural Networks Basics", description: "Perceptrons, backpropagation, and TensorFlow/Keras", order: 4, lessonsCount: 12 },
  { id: "mod-02-5", courseId: "crs-02", title: "Model Deployment & MLOps Intro", description: "Saving models, APIs, and monitoring basics", order: 5, lessonsCount: 8 },
  { id: "mod-02-6", courseId: "crs-02", title: "Capstone Project", description: "End-to-end ML project from data to deployment", order: 6, lessonsCount: 8 },

  // Course 3: Advanced Deep Learning
  { id: "mod-03-1", courseId: "crs-03", title: "CNN Architectures", description: "ResNet, EfficientNet, Vision Transformers, and modern CV", order: 1, lessonsCount: 16 },
  { id: "mod-03-2", courseId: "crs-03", title: "Sequence Models", description: "RNNs, LSTMs, GRUs, and attention mechanisms", order: 2, lessonsCount: 14 },
  { id: "mod-03-3", courseId: "crs-03", title: "Transformers & LLMs", description: "BERT, GPT, fine-tuning, and parameter-efficient methods", order: 3, lessonsCount: 20 },
  { id: "mod-03-4", courseId: "crs-03", title: "Generative AI", description: "Diffusion models, GANs, VAEs, and Stable Diffusion", order: 4, lessonsCount: 18 },
  { id: "mod-03-5", courseId: "crs-03", title: "Production ML Systems", description: "Distributed training, model serving, and monitoring", order: 5, lessonsCount: 12 },
  { id: "mod-03-6", courseId: "crs-03", title: "Research Project", description: "Reproduce a paper and extend it", order: 6, lessonsCount: 8 },

  // Course 5: UX Design Fundamentals
  { id: "mod-05-1", courseId: "crs-05", title: "Design Thinking & Process", description: "Empathize, define, ideate, prototype, test", order: 1, lessonsCount: 8 },
  { id: "mod-05-2", courseId: "crs-05", title: "User Research Methods", description: "Interviews, surveys, usability testing, and analytics", order: 2, lessonsCount: 10 },
  { id: "mod-05-3", courseId: "crs-05", title: "Wireframing & Prototyping", description: "Low-fi to high-fi in Figma, interactive prototypes", order: 3, lessonsCount: 12 },
  { id: "mod-05-4", courseId: "crs-05", title: "Visual Design Principles", description: "Typography, color, layout, and design systems basics", order: 4, lessonsCount: 10 },
  { id: "mod-05-5", courseId: "crs-05", title: "Accessibility & Inclusive Design", description: "WCAG, screen readers, and inclusive patterns", order: 5, lessonsCount: 8 },

  // Course 7: Kubernetes & Cloud Native DevOps
  { id: "mod-07-1", courseId: "crs-07", title: "Container Fundamentals", description: "Docker, images, registries, and multi-stage builds", order: 1, lessonsCount: 10 },
  { id: "mod-07-2", courseId: "crs-07", title: "Kubernetes Core Concepts", description: "Pods, Services, Deployments, ConfigMaps, Secrets", order: 2, lessonsCount: 14 },
  { id: "mod-07-3", courseId: "crs-07", title: "Advanced Workloads", description: "StatefulSets, DaemonSets, Jobs, CronJobs, Operators", order: 3, lessonsCount: 12 },
  { id: "mod-07-4", courseId: "crs-07", title: "Networking & Security", description: "CNI, Ingress, Network Policies, Service Mesh", order: 4, lessonsCount: 14 },
  { id: "mod-07-5", courseId: "crs-07", title: "GitOps & Observability", description: "ArgoCD, Prometheus, Grafana, Loki, Tempo", order: 5, lessonsCount: 12 },
  { id: "mod-07-6", courseId: "crs-07", title: "Production Patterns", description: "Multi-cluster, disaster recovery, and cost optimization", order: 6, lessonsCount: 10 },

  // Course 9: Data Science Bootcamp
  { id: "mod-09-1", courseId: "crs-09", title: "Python Foundations", description: "Data types, control flow, functions, and OOP", order: 1, lessonsCount: 12 },
  { id: "mod-09-2", courseId: "crs-09", title: "Data Manipulation with pandas", description: "Cleaning, transforming, merging, and time series", order: 2, lessonsCount: 16 },
  { id: "mod-09-3", courseId: "crs-09", title: "Exploratory Data Analysis", description: "Visualization, statistics, and hypothesis testing", order: 3, lessonsCount: 14 },
  { id: "mod-09-4", courseId: "crs-09", title: "Feature Engineering", description: "Encoding, scaling, selection, and pipelines", order: 4, lessonsCount: 12 },
  { id: "mod-09-5", courseId: "crs-09", title: "Machine Learning Models", description: "Regression, classification, ensemble methods", order: 5, lessonsCount: 14 },
  { id: "mod-09-6", courseId: "crs-09", title: "Capstone Project", description: "Kaggle competition end-to-end", order: 6, lessonsCount: 8 },

  // Add modules for remaining courses (abbreviated for brevity)
  ...Array.from({ length: 15 }, (_, i) => [
    {
      id: `mod-${i + 10}-1`,
      courseId: `crs-${i + 10}`,
      title: "Module 1: Foundations",
      description: "Core concepts and fundamentals",
      order: 1,
      lessonsCount: 8,
    },
    {
      id: `mod-${i + 10}-2`,
      courseId: `crs-${i + 10}`,
      title: "Module 2: Core Skills",
      description: "Hands-on practice and applications",
      order: 2,
      lessonsCount: 10,
    },
    {
      id: `mod-${i + 10}-3`,
      courseId: `crs-${i + 10}`,
      title: "Module 3: Advanced Topics",
      description: "Deep dives and real-world projects",
      order: 3,
      lessonsCount: 8,
    },
    {
      id: `mod-${i + 10}-4`,
      courseId: `crs-${i + 10}`,
      title: "Module 4: Capstone",
      description: "Final project and portfolio piece",
      order: 4,
      lessonsCount: 6,
    },
  ]).flat(),
];