import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-submissionadmin',
  templateUrl: './submissionadmin.component.html',
  styleUrls: ['./submissionadmin.component.css']
})

export class SubmissionadminComponent implements OnInit {
  submissions: any[] = [];

  constructor(private submissionService: MessageService) { }

  ngOnInit(): void {
    this.loadSubmissions();
  }

  loadSubmissions(): void {
    this.submissionService.getAllSubmissions().subscribe(
      (submissions) => {
        this.submissions = submissions;
      },
      (error) => {
        console.error('Error fetching submissions', error);
      }
    );
  }

  handleReview(submissionId: number, status: 'approved' | 'rejected'): void {
    if (status === 'approved') {
      this.submissionService.approveSubmission(submissionId).subscribe(
        () => {
          this.updateSubmissionStatus(submissionId, 'approved');
        },
        (error) => {
          console.error('Error approving submission', error);
        }
      );
    } else if (status === 'rejected') {
      this.submissionService.rejectSubmission(submissionId).subscribe(
        () => {
          this.updateSubmissionStatus(submissionId, 'rejected');
        },
        (error) => {
          console.error('Error rejecting submission', error);
        }
      );
    }
  }

  private updateSubmissionStatus(submissionId: number, newStatus: string): void {
    const submission = this.submissions.find((s) => s.id === submissionId);
    if (submission) {
      submission.status = newStatus;
    }
  }
}
