import { describe, it, expect } from "vitest";
import { Timer } from "../src/core/libs/Timer";

describe("Timer", () => {
  it("should measure elapsed time", async () => {
    const timer = new Timer();
    await new Promise((resolve) => setTimeout(resolve, 50));
    const elapsed = timer.elapsed();
    expect(elapsed).toBeGreaterThanOrEqual(45);
  });

  it("should mark and measure between markers", () => {
    const timer = new Timer();
    timer.mark("start");
    timer.mark("end");
    const duration = timer.measure("start", "end");
    expect(duration).toBeGreaterThanOrEqual(0);
  });

  it("should reset timer", async () => {
    const timer = new Timer();
    await new Promise((resolve) => setTimeout(resolve, 50));
    timer.reset();
    const elapsed = timer.elapsed();
    expect(elapsed).toBeLessThan(10);
  });

  it("should get current ISO timestamp", () => {
    const timestamp = Timer.now();
    expect(timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });
});
