export const templates = [
    {
        id: "build-log",
        title: "Build Log",
        description: "Document a project you've been building.",
        placeholderTitle: "Building .....",
        placeholderSummary: "Share what you're building, why you built it, and what you learned.",
        defaultTags: ["build-log"],
        content: `# Project Overview

Briefly introduce your project.

---

# Goal

What problem were you trying to solve?

---

# Tech Stack

- Frontend:
- Backend:
- Database:
- Deployment:

---

# Implementation

Walk through how you approached the project.

---

# Challenges

What obstacles did you face?

How did you solve them?

---

# Lessons Learned

What did this project teach you?

---

# Next Steps

What improvements would you make in the future?`
    },

    {
        id: "architecture-decision",
        title: "Architecture Decision",
        description: "Explain why you chose a technical solution.",
        placeholderTitle: "Why I Chose .....",
        placeholderSummary: "Explain the reasoning behind an important technical decision.",
        defaultTags: ["architecture"],
        content: `# Context

Describe the project and the problem.

---

# Options Considered

List the possible solutions.

- Option A
- Option B
- Option C

---

# Final Decision

Which option did you choose?

Why?

---

# Trade-offs

What advantages and disadvantages did the decision introduce?

---

# Future Improvements

Would you make the same decision again?`
    },

    {
        id: "refactor-story",
        title: "Refactor Story",
        description: "Walk through improving existing code.",
        placeholderTitle: "Refactoring .....",
        placeholderSummary: "Share how and why you improved an existing implementation.",
        defaultTags: ["refactor"],
        content: `# Original Implementation

Explain how it originally worked.

---

# Problems

What issues did it have?

---

# Refactor Strategy

Describe your improvements.

---

# Final Result

Show what changed.

---

# Lessons Learned

What did this refactor teach you?`
    },

    {
        id: "bug-fix-journey",
        title: "Bug Fix Journey",
        description: "Explain how you diagnosed and fixed an issue.",
        placeholderTitle: "How I Fixed .....",
        placeholderSummary: "Take readers through your debugging process.",
        defaultTags: ["bug-fix"],
        content: `# The Bug

Describe the issue.

---

# Symptoms

What did you observe?

---

# Investigation

How did you debug it?

---

# Root Cause

What actually caused the bug?

---

# ✅ Solution

How did you fix it?

---

# Prevention

How can this bug be avoided in the future?`
    },

    {
        id: "tutorial",
        title: "Tutorial",
        description: "Teach others how to build or understand something.",
        placeholderTitle: "How to .....",
        placeholderSummary: "Teach readers something useful step by step.",
        defaultTags: ["tutorial"],
        content: `# Introduction

What will readers learn?

---

# Prerequisites

List anything needed before starting.

---

# Step-by-Step Guide

## Step 1

Explain.

## Step 2

Explain.

## Step 3

Explain.

---

# 🎉 Final Result

Show the expected outcome.

---

# Conclusion

Summarize the key takeaways.`
    },

    {
        id: "post-mortem",
        title: "Post Mortem",
        description: "Reflect on an incident and identify lessons learned.",
        placeholderTitle: "Post Mortem: .....",
        placeholderSummary: "Analyze what happened, why it happened, and what you'll improve.",
        defaultTags: ["post-mortem"],
        content: `# ⚠ Incident Summary

Briefly describe what happened.

---

# 📅 Timeline

List the sequence of events.

---

# Impact

Who or what was affected?

---

# 🔎 Root Cause

What ultimately caused the incident?

---

# 🛠 Resolution

How was the issue resolved?

---

# 📚 Lessons Learned

What did the team learn?

---

# Action Items

What improvements will prevent this in the future?`
    },

    {
        id: "blank-story",
        title: "Blank Story",
        description: "Start writing from scratch.",
        placeholderTitle: "",
        placeholderSummary: "",
        defaultTags: [],
        content: ""
    }
];