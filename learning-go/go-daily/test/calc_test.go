package main

import (
	"calc"
	"testing"
)

func TestAdd(t *testing.T) {
	if ans := calc.Add(1, 2); ans != 3 {
		t.Error("add(1, 2) should be equal to 3")
	}
}
